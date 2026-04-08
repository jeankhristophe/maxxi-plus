DELETE FROM podcasts WHERE title = 'Chroniques Criminelles';
DELETE FROM podcasts WHERE title = 'Transfert';

DO $$
DECLARE pid uuid;
BEGIN

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('Encore une histoire', 'Benjamin Muller', 'https://assets.pippa.io/shows/670d1795df4dd6f896655670/show-cover.jpeg', 'Éducation', 'Podcast #1 des familles. Chaque semaine, une nouvelle histoire pour les enfants.', true)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'EP04 Les Primaires', 'https://sphinx.acast.com/p/open/s/670d1795df4dd6f896655670/e/69baa1e82a50a730d3293900/media.mp3', 614, '2026-04-08', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'La princesse au petit pois', 'https://sphinx.acast.com/p/open/s/670d1795df4dd6f896655670/e/69d3b5e2f44b357ce9faa378/media.mp3', 295, '2026-04-06', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'S02E03 Chili à l''école des fantômes', 'https://sphinx.acast.com/p/open/s/670d1795df4dd6f896655670/e/69cbfb8316bd65d069a5f539/media.mp3', 848, '2026-04-03', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'EP03 Les Primaires', 'https://sphinx.acast.com/p/open/s/670d1795df4dd6f896655670/e/69baa1d8efe096304cc76be4/media.mp3', 643, '2026-04-01', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'PART 2 Bolduc visite la prison d''Alcatraz', 'https://sphinx.acast.com/p/open/s/670d1795df4dd6f896655670/e/69c52f49c2759aa9b1a5b328/media.mp3', 578, '2026-03-29', true);

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('Métamorphose', 'Anne Ghesquière', 'https://assets.pippa.io/shows/611d23c506c05e8ca7f406ce/1710411752636-d3bfe9076660b03ea86f25e0863e4642.jpeg', 'Santé', 'Conversations inspirantes autour du bien-être et du développement personnel.', false)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'De la sidération à la vie : le chemin intime du deuil avec Perla Servan-Schreiber', 'https://sphinx.acast.com/p/acast/s/metamorphose-le-podcast-qui-eveille-la-conscience/e/69c159ca98c87229ca5dcb13/media.mp3', 2287, '2026-04-08', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Charlotte Casiraghi : peut-on habiter nos fragilités, nos failles, nos fêlures ? #680', 'https://sphinx.acast.com/p/acast/s/metamorphose-le-podcast-qui-eveille-la-conscience/e/69bad5005e3cc3314b388684/media.mp3', 3787, '2026-04-06', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Dr Mathieu Bernard-Le Bourvellec : Le cœur, notre autre cerveau !', 'https://sphinx.acast.com/p/acast/s/metamorphose-le-podcast-qui-eveille-la-conscience/e/6980ea90e364600d37fe0895/media.mp3', 3657, '2026-04-04', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Samuel Ganes : Comprendre les bases de la détox pour ne pas faire n’importe quoi', 'https://sphinx.acast.com/p/acast/s/metamorphose-le-podcast-qui-eveille-la-conscience/e/69ba89963f69d5e0cdd69e25/media.mp3', 830, '2026-04-03', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Violences faites aux femmes : ce que Shéhérazade nous crie encore par Sophie Fontanel #679', 'https://sphinx.acast.com/p/acast/s/metamorphose-le-podcast-qui-eveille-la-conscience/e/69b95dec095aeb819e2d6e25/media.mp3', 4100, '2026-04-02', true);

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('Choses à Savoir', 'Louis-Guillaume Kan-Lacas', 'https://assets.pippa.io/shows/66057de88268a800162cadf2/1774335754150-e426ca0e-50b4-456c-90c2-fabe47029667.jpeg', 'Éducation', 'Culture générale quotidienne en format court.', true)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Pourquoi rougit-on quand on est gêné ?', 'https://sphinx.acast.com/p/open/s/66057de88268a800162cadf2/e/69cc6c59d0d5402d882550db/media.mp3', 161, '2026-04-08', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Qu''est-ce que le paradoxe du bateau de Thésée ?', 'https://sphinx.acast.com/p/open/s/66057de88268a800162cadf2/e/69cde400b601292a80fbae65/media.mp3', 123, '2026-04-08', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Pourquoi dit-on “à la queue leu leu” et “aller à vau-l''eau” ?', 'https://sphinx.acast.com/p/open/s/66057de88268a800162cadf2/e/69cc6c3ae8519e977f96d80c/media.mp3', 131, '2026-04-07', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Qu''est-ce que le paradoxe des feuilles de thé ?', 'https://sphinx.acast.com/p/open/s/66057de88268a800162cadf2/e/69cde3d93908885dc408af4d/media.mp3', 152, '2026-04-07', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Pourquoi Dumas et Balzac se détestaient-ils ?', 'https://sphinx.acast.com/p/open/s/66057de88268a800162cadf2/e/69cc6c0216bd65d069cf1322/media.mp3', 150, '2026-04-06', true);

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('La Martingale', 'Matthieu Stefani / Orso Media', 'https://static.audiomeans.fr/img/podcast/0ae29bde-15ff-47a0-b274-e0c0e91160da.jpg', 'Business', 'Finance personnelle et investissement décryptés par des experts.', false)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, '#311 - Investir dans l’hôtellerie à partir de 1000€ - Steve Lepine', 'https://audio.audiomeans.fr/file/JvZnVYByuX/a557717b-5e9a-49d6-9c8c-1861930383a5.mp3?_=1774944081&amp;ps=647b907b-5a2f-4a11-94cb-591d604cb1b9', 3630, '2026-04-02', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, '#310 - Bulle ou rotation ? Ce que les marchés nous préparent vraiment - Anne-Laure  Frischlander-Jacobson', 'https://audio.audiomeans.fr/file/JvZnVYByuX/a34ea13b-6a4b-48d2-9262-cc5ef2a0ea91.mp3?_=1774340683&amp;ps=647b907b-5a2f-4a11-94cb-591d604cb1b9', 4266, '2026-03-26', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, '#309 - Investir dans des voitures de collection : ça vaut le coup ? - Gonzague  Ruchaud', 'https://audio.audiomeans.fr/file/JvZnVYByuX/894cd34c-c858-4a96-9b18-bccf0c1d2c9a.mp3?_=1773301058&amp;ps=647b907b-5a2f-4a11-94cb-591d604cb1b9', 4541, '2026-03-19', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, '#308 - Ne vous faites plus avoir par votre conseiller financier - Pierre Marin', 'https://audio.audiomeans.fr/file/JvZnVYByuX/5da736f3-36f4-4b81-ab1f-9b79917cc7ec.mp3?_=1770884857&amp;ps=647b907b-5a2f-4a11-94cb-591d604cb1b9', 4305, '2026-03-12', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, '#307 - La décennie qui va tout changer - Alain Madelin', 'https://audio.audiomeans.fr/file/JvZnVYByuX/84aa2c53-9fd0-4bd4-9f80-971404a237f1.mp3?_=1772638492&amp;ps=647b907b-5a2f-4a11-94cb-591d604cb1b9', 4338, '2026-03-05', true);

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('Underscore_', 'Micode', 'https://assets.pippa.io/shows/6139142f588d8c5deac642d6/1642094219356-8dadc17af98777924f2d95ac8858f3e2.jpeg', 'Technologie', 'Conversations avec ceux qui construisent : hacking, dev, IA.', true)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'On a reçu le hacker qui a infiltré un groupe de pirates chinois — gad_hack (rediff)', 'https://sphinx.acast.com/p/acast/s/micode-underscore/e/69b2888ec891dc74e87c3445/media.mp3', 1348, '2026-03-23', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Comment les jeux vidéos vous manipulent pour vous ruiner  — chronique Matthieu Lambda (rediff)', 'https://sphinx.acast.com/p/acast/s/micode-underscore/e/69b28872bba705d7aa66c91b/media.mp3', 1182, '2026-03-19', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'ChatGPT ne devrait pas pouvoir faire ça — Fabien Vauchelles', 'https://sphinx.acast.com/p/acast/s/micode-underscore/e/69b287e9c891dc74e87bf677/media.mp3', 1911, '2026-03-16', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Trafic d’antiquités : le selfie qui a piégé le Metropolitan Museum — Micode', 'https://sphinx.acast.com/p/acast/s/micode-underscore/e/6989a8d604a1e56be2b9b8f0/media.mp3', 1835, '2026-03-09', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Finalement, nos téléphones pourraient bel et bien nous écouter  (rediff)', 'https://sphinx.acast.com/p/acast/s/micode-underscore/e/6989a8bc61be1892704faffe/media.mp3', 1573, '2026-03-05', true);

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('InPower', 'Louise Aubery', 'https://assets.pippa.io/shows/65294b6074eb720012379a6a/show-cover.jpeg', 'Société', 'Parcours inspirants et motivation. Chaque mardi.', false)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'On vous vole votre attention (et ce n’est pas ce que vous pensez), avec la philosophe Apolline Guillot', 'https://sphinx.acast.com/p/open/s/65294b6074eb720012379a6a/e/69c3e006a7e4dae8ea65bf81/media.mp3', 3939, '2026-04-07', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Ce que le directeur de l''ENS enseigne à ses élèves [Moment-Clé]', 'https://sphinx.acast.com/p/open/s/65294b6074eb720012379a6a/e/69bc3ce895149b1c3e21e982/media.mp3', 695, '2026-04-02', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Comment ne plus jamais se faire manipuler : voici les secrets d’un négociateur de crise', 'https://sphinx.acast.com/p/open/s/65294b6074eb720012379a6a/e/69bd8fef404ec51da9ecd646/media.mp3', 5483, '2026-03-31', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Faire la paix avec la nourriture avec Emilie Steinbach [moment clé]', 'https://sphinx.acast.com/p/open/s/65294b6074eb720012379a6a/e/69668078023744df11047c6d/media.mp3', 1216, '2026-03-26', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Styleto : Comment arrêter de s’excuser et prendre sa place ?', 'https://sphinx.acast.com/p/open/s/65294b6074eb720012379a6a/e/69bd4fb8c462bfcb3e9723dd/media.mp3', 4505, '2026-03-23', true);

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('Floodcast', 'Florent Bernard', 'https://assets.pippa.io/shows/5ffe3facad3e633276e9ea57/show-cover.jpg', 'Comédie', 'Discussions décontractées et humoristiques avec des artistes invités.', false)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'S10E43 - Pierre Bachelet Sature', 'https://sphinx.acast.com/p/open/s/5ffe3facad3e633276e9ea57/e/687b73330d2a2189936c1a3d/media.mp3', 4797, '2025-07-21', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'S10E42 - Au revoir le Floodcast', 'https://sphinx.acast.com/p/open/s/5ffe3facad3e633276e9ea57/e/6873a68dc81f4db04afd68dd/media.mp3', 5445, '2025-07-14', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'S10E41 - Elon Meusp', 'https://sphinx.acast.com/p/open/s/5ffe3facad3e633276e9ea57/e/686a6b90eb5273b792f913e0/media.mp3', 4532, '2025-07-07', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'S10E40 - Le Cri du Jugnot', 'https://sphinx.acast.com/p/open/s/5ffe3facad3e633276e9ea57/e/6861b7de081ac1df5d0a4dc7/media.mp3', 4293, '2025-06-30', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'S10E39 - C’était un Rêve à Réaliser', 'https://sphinx.acast.com/p/open/s/5ffe3facad3e633276e9ea57/e/6858af61c1af62f02756a8c0/media.mp3', 3722, '2025-06-23', true);

  INSERT INTO podcasts (title, author, cover_url, category, description, is_featured)
  VALUES ('2 Heures De Perdues', '2HDP', 'https://image.ausha.co/XboDHYC69Oorw8MBObAkQ2sTPdxGTkexH3nYQ8Ky_1400x1400.jpeg?t=1619074925', 'Comédie', 'Chaque mercredi, un film passé en revue par une bande de cinéphiles.', false)
  RETURNING id INTO pid;

  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Star Wars : Le Retour du Jedi', 'https://audio.ausha.co/b71LpSv94z4e.mp3?t=1717572189', 9166, '2024-06-05', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Les Ensorceleuses', 'https://audio.ausha.co/B1j1vHYkvLRo.mp3?t=1716366452', 3839, '2024-05-29', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Le Monde Perdu : Jurassic Park', 'https://audio.ausha.co/o9rQwSDjZdrx.mp3?t=1715966712', 5084, '2024-05-22', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Le Grand Bleu', 'https://audio.ausha.co/odq3VHDqgXm2.mp3?t=1714996672', 4318, '2024-05-15', true);
  INSERT INTO episodes (podcast_id, title, audio_url, duration_seconds, published_at, is_published)
  VALUES (pid, 'Pulp Fiction', 'https://audio.ausha.co/yEAEMIz958Qq.mp3?t=1714995818', 5163, '2024-05-08', true);

END $$;
