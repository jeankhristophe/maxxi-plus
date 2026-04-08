-- ═══════════════════════════════════════════════════
-- MAXXI+ Schema — À exécuter dans l'éditeur SQL Supabase
-- ═══════════════════════════════════════════════════

-- ─── Categories ───
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  sort_order int DEFAULT 0
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

-- ─── Radio Stations ───
CREATE TABLE radio_stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('fm', 'web')),
  frequency text,
  genre text NOT NULL,
  tagline text DEFAULT '',
  stream_url text NOT NULL,
  cover_url text,
  color text DEFAULT '#8B5CF6',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE radio_stations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read radio_stations" ON radio_stations FOR SELECT USING (true);

-- ─── Podcasts ───
CREATE TABLE podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  cover_url text,
  category text NOT NULL,
  description text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read podcasts" ON podcasts FOR SELECT USING (true);

-- Index full-text search (français)
ALTER TABLE podcasts ADD COLUMN fts tsvector
  GENERATED ALWAYS AS (
    to_tsvector('french', coalesce(title, '') || ' ' || coalesce(author, '') || ' ' || coalesce(description, ''))
  ) STORED;

CREATE INDEX podcasts_fts_idx ON podcasts USING gin(fts);

-- ─── Episodes ───
CREATE TABLE episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  podcast_id uuid REFERENCES podcasts(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  audio_url text NOT NULL,
  duration_seconds int,
  published_at timestamptz,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published episodes" ON episodes FOR SELECT USING (is_published = true);

-- ─── Favorites (pour plus tard) ───
CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  podcast_id uuid REFERENCES podcasts(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, podcast_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- ─── Fonction de recherche ───
CREATE OR REPLACE FUNCTION search_podcasts(query text)
RETURNS SETOF podcasts
LANGUAGE sql STABLE
AS $$
  SELECT *
  FROM podcasts
  WHERE fts @@ plainto_tsquery('french', query)
  ORDER BY ts_rank(fts, plainto_tsquery('french', query)) DESC;
$$;
