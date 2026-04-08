-- ═══════════════════════════════════════════════════
-- MAXXI+ Seed Data — À exécuter APRÈS schema.sql
-- ═══════════════════════════════════════════════════

-- ─── Categories ───
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Culture', 'culture', 1),
  ('Actualité', 'actualite', 2),
  ('Comédie', 'comedie', 3),
  ('Technologie', 'technologie', 4),
  ('Histoire', 'histoire', 5),
  ('Sport', 'sport', 6),
  ('Musique', 'musique', 7),
  ('Société', 'societe', 8),
  ('Science', 'science', 9),
  ('Business', 'business', 10),
  ('Éducation', 'education', 11),
  ('Politique', 'politique', 12),
  ('Santé', 'sante', 13);

-- ─── Radio Stations (5 FM + 5 Web) ───
INSERT INTO radio_stations (name, type, frequency, genre, tagline, stream_url, cover_url, color, sort_order) VALUES
  ('MAXXI FM', 'fm', '95.8', 'Hits & Pop', 'La radio qui vous ressemble', 'https://stream.maxxi.fm/live', 'https://picsum.photos/seed/maxxifm/400/400', '#8B5CF6', 1),
  ('MAXXI Groove', 'fm', '101.3', 'Funk & Soul', 'Le groove dans les veines', 'https://stream.maxxi.fm/groove', 'https://picsum.photos/seed/groove/400/400', '#A855F7', 2),
  ('MAXXI Urban', 'fm', '88.6', 'Rap & RnB', 'L''énergie urbaine', 'https://stream.maxxi.fm/urban', 'https://picsum.photos/seed/urban/400/400', '#EF4444', 3),
  ('MAXXI Classique', 'fm', '92.1', 'Classique & Jazz', 'L''élégance musicale', 'https://stream.maxxi.fm/classique', 'https://picsum.photos/seed/classique/400/400', '#F59E0B', 4),
  ('MAXXI Zen', 'fm', '104.7', 'Chill & Ambient', 'Votre bulle de sérénité', 'https://stream.maxxi.fm/zen', 'https://picsum.photos/seed/zen/400/400', '#22C55E', 5),
  ('MAXXI Electro', 'web', NULL, 'Électro & House', 'Les beats qui font vibrer', 'https://stream.maxxi.fm/electro', 'https://picsum.photos/seed/electro/400/400', '#06B6D4', 6),
  ('MAXXI Tropical', 'web', NULL, 'Afrobeats & Dancehall', 'Les sons du soleil', 'https://stream.maxxi.fm/tropical', 'https://picsum.photos/seed/tropical/400/400', '#F97316', 7),
  ('MAXXI Rock', 'web', NULL, 'Rock & Indie', 'Le rock sans compromis', 'https://stream.maxxi.fm/rock', 'https://picsum.photos/seed/rock/400/400', '#DC2626', 8),
  ('MAXXI Lo-Fi', 'web', NULL, 'Lo-Fi & Beats', 'Focus & détente', 'https://stream.maxxi.fm/lofi', 'https://picsum.photos/seed/lofi/400/400', '#8B5CF6', 9),
  ('MAXXI Franco', 'web', NULL, 'Chanson française', 'La chanson française d''hier et d''aujourd''hui', 'https://stream.maxxi.fm/franco', 'https://picsum.photos/seed/franco/400/400', '#3B82F6', 10);

-- ─── Podcasts ───
INSERT INTO podcasts (title, author, cover_url, category, description, is_featured) VALUES
  ('Les Couilles sur la Table', 'Binge Audio', 'https://picsum.photos/seed/podcast1/400/400', 'Société', 'Un podcast qui questionne la masculinité et ses effets sur nos vies.', true),
  ('Transfert', 'Slate.fr', 'https://picsum.photos/seed/podcast2/400/400', 'Culture', 'Des histoires vraies racontées par ceux qui les ont vécues.', true),
  ('Floodcast', 'FloodCorp', 'https://picsum.photos/seed/podcast3/400/400', 'Comédie', 'Le podcast qui part dans tous les sens, pour le meilleur et pour le pire.', false),
  ('Le Code a changé', 'France Inter', 'https://picsum.photos/seed/podcast4/400/400', 'Technologie', 'Comment le numérique transforme notre quotidien.', true),
  ('Affaires Sensibles', 'France Inter', 'https://picsum.photos/seed/podcast5/400/400', 'Histoire', 'Plongée dans les grandes affaires qui ont marqué l''Histoire.', false),
  ('2 Heures de Perdues', '2HDP', 'https://picsum.photos/seed/podcast6/400/400', 'Comédie', 'On regarde des films pour que vous n''ayez pas à le faire.', false),
  ('La Poudre', 'Nouvelles Écoutes', 'https://picsum.photos/seed/podcast7/400/400', 'Société', 'Conversations intimes avec des femmes inspirantes.', false),
  ('Underscore_', 'Micode', 'https://picsum.photos/seed/podcast8/400/400', 'Technologie', 'Les histoires méconnues de la tech et du numérique.', true),
  ('Les Odyssées', 'France Inter', 'https://picsum.photos/seed/podcast9/400/400', 'Éducation', 'Les grandes aventures de l''Histoire racontées aux enfants.', false),
  ('Thune', 'Binge Audio', 'https://picsum.photos/seed/podcast10/400/400', 'Business', 'Parlons argent sans tabou.', false),
  ('Programme B', 'Binge Audio', 'https://picsum.photos/seed/podcast11/400/400', 'Actualité', 'L''actualité décryptée autrement, chaque jour.', false),
  ('Sur les Épaules de Darwin', 'France Inter', 'https://picsum.photos/seed/podcast12/400/400', 'Science', 'Un voyage entre science, nature et humanité.', true);

-- ─── Episodes (pour les premiers podcasts) ───
-- On récupère les IDs dynamiquement
DO $$
DECLARE
  pid1 uuid;
  pid2 uuid;
  pid4 uuid;
  pid8 uuid;
BEGIN
  SELECT id INTO pid1 FROM podcasts WHERE title = 'Les Couilles sur la Table' LIMIT 1;
  SELECT id INTO pid2 FROM podcasts WHERE title = 'Transfert' LIMIT 1;
  SELECT id INTO pid4 FROM podcasts WHERE title = 'Le Code a changé' LIMIT 1;
  SELECT id INTO pid8 FROM podcasts WHERE title = 'Underscore_' LIMIT 1;

  INSERT INTO episodes (podcast_id, title, description, audio_url, duration_seconds, published_at, is_published) VALUES
    (pid1, 'Comment éduque-t-on les garçons ?', 'Dans cet épisode, on explore les méthodes d''éducation genrées et leurs conséquences.', 'https://example.com/ep1.mp3', 3512, '2026-04-01', true),
    (pid1, 'Le sport, dernier bastion viril ?', 'Le sport reste l''un des espaces les plus genrés de notre société.', 'https://example.com/ep2.mp3', 3134, '2026-03-25', true),
    (pid1, 'Paternité : les nouveaux pères', 'Que signifie être père aujourd''hui ? Témoignages et analyses.', 'https://example.com/ep3.mp3', 2825, '2026-03-18', true),
    (pid2, 'La nuit où tout a basculé', 'Marie raconte cette nuit qui a changé le cours de sa vie.', 'https://example.com/ep4.mp3', 1938, '2026-04-03', true),
    (pid2, 'Le secret de mon grand-père', 'Un secret de famille révélé 40 ans plus tard.', 'https://example.com/ep5.mp3', 1725, '2026-03-27', true),
    (pid4, 'L''IA générative va-t-elle tout changer ?', 'Décryptage de la révolution de l''intelligence artificielle.', 'https://example.com/ep6.mp3', 2530, '2026-04-05', true),
    (pid8, 'Le plus grand hack de l''histoire', 'Retour sur l''attaque qui a paralysé des milliers d''entreprises.', 'https://example.com/ep7.mp3', 2122, '2026-04-02', true);
END $$;
