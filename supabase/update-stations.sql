-- ═══════════════════════════════════════════════════
-- Mise à jour : remplacer les stations fictives par les vraies
-- À exécuter dans l'éditeur SQL Supabase
-- ═══════════════════════════════════════════════════

-- Supprimer toutes les stations fictives
DELETE FROM radio_stations;

-- Insérer les 4 vraies stations
INSERT INTO radio_stations (name, type, frequency, genre, tagline, stream_url, cover_url, color, sort_order) VALUES
  ('Chérie FM Guadeloupe', 'fm', NULL, 'Hits & Variétés', 'Vos plus belles émotions', 'https://maxxi.studio/listen/cheriefmgp/radio.mp3', 'https://picsum.photos/seed/cheriefmgp/400/400', '#E91E63', 1),
  ('Chérie FM Martinique', 'fm', NULL, 'Hits & Variétés', 'Vos plus belles émotions', 'https://maxxi.studio/listen/cheriefmmq/radio.mp3', 'https://picsum.photos/seed/cheriefmmq/400/400', '#E91E63', 2),
  ('Maxxi Guadeloupe', 'fm', NULL, 'Urban & Hits', 'La radio des Antilles', 'https://maxxi.studio/listen/maxxigp/radio.mp3', 'https://picsum.photos/seed/maxxigp/400/400', '#8B5CF6', 3),
  ('Maxxi Martinique', 'fm', NULL, 'Urban & Hits', 'La radio des Antilles', 'https://maxxi.studio/listen/maxximq/radio.mp3', 'https://picsum.photos/seed/maxximq/400/400', '#8B5CF6', 4);
