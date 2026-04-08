-- ═══════════════════════════════════════════════════
-- Import Podcasts — Sélection MAXXI+
-- RMC + Meilleurs podcasts français
-- À exécuter dans l'éditeur SQL Supabase
-- ═══════════════════════════════════════════════════

-- Supprimer les podcasts et épisodes de demo
DELETE FROM episodes;
DELETE FROM podcasts;

-- ─── PODCASTS RMC ───

INSERT INTO podcasts (title, author, cover_url, category, description, is_featured) VALUES
(
  'L''After Foot',
  'RMC',
  'https://image.simplecastcdn.com/images/1fd73afa-ad51-414f-aa4b-53e39be70a2e/20d59213-e175-42ca-baa3-ef25b00f5215/3000x3000/1400-podcasts-afterfoot-2025-def.jpg',
  'Sport',
  'L''émission référence du football français. Chaque soir, Gilbert Brisbois, Daniel Riolo et leurs chroniqueurs débattent de toute l''actualité du foot.',
  true
),
(
  'Les Grandes Gueules',
  'RMC',
  'https://image.simplecastcdn.com/images/1fd73afa-ad51-414f-aa4b-53e39be70a2e/d939cf1a-39c3-472d-bb00-8262220f3b4f/3000x3000/1400-podcasts-grandesgueules-2025.jpg',
  'Politique',
  'Le talk-show de la liberté d''expression. Alain Marschall et Olivier Truchot reçoivent des citoyens qui débattent de l''actualité.',
  true
),
(
  'Apolline Matin',
  'RMC',
  'https://image.simplecastcdn.com/images/1fd73afa-ad51-414f-aa4b-53e39be70a2e/2571158c-494d-4799-986a-6d60b42924e8/3000x3000/1400-podcasts-apollinematin2-20-2.jpg',
  'Actualité',
  'La matinale 100% info et auditeurs d''Apolline de Malherbe sur RMC, de 6h à 9h. Décryptage de l''actualité avec bonne humeur.',
  true
),
(
  'Rothen s''enflamme',
  'RMC',
  'https://image.simplecastcdn.com/images/1fd73afa-ad51-414f-aa4b-53e39be70a2e/fa466135-c995-4054-9eaa-778a662c0c9c/3000x3000/1400-podcasts-rothen-senflamme2023-def.jpg',
  'Sport',
  'Chaque soir de 18h à 20h, Jérôme Rothen et sa Dream Team d''anciens pros débattent de l''actualité du football.',
  false
),
(
  'Super Moscato Show',
  'RMC',
  'https://image.simplecastcdn.com/images/1fd73afa-ad51-414f-aa4b-53e39be70a2e/b5b43fc9-1bc0-4bd4-ab1e-14d99ad9aa52/3000x3000/1400-podcasts-moscatoshow-2023.jpg',
  'Sport',
  'Vincent Moscato anime le show sportif de 15h à 18h sur RMC avec humour, débats enflammés et invités du monde du sport.',
  false
),
(
  'Top of the Foot',
  'RMC',
  'https://image.simplecastcdn.com/images/da520d99-245f-48ad-97e9-bb2c400b2c37/80631544-5d45-4976-97b9-a305b5d68553/3000x3000/top-of-the-foot.jpg',
  'Sport',
  'Mohamed Bouhafsi et Jean-Louis Tourre présentent l''actualité du football chaque jour sur RMC.',
  false
),
(
  'Estelle Midi',
  'RMC',
  'https://image.simplecastcdn.com/images/1fd73afa-ad51-414f-aa4b-53e39be70a2e/7f2fcdb7-6b79-4f35-9d1e-f15466dfe1d1/3000x3000/estelle-midi.jpg',
  'Société',
  'Estelle Denis et Charles Magnien traitent de société, consommation et débats de 12h à 15h sur RMC.',
  false
),
(
  'Les chroniques d''Arnaud Demanche',
  'RMC',
  'https://image.simplecastcdn.com/images/458dcd5b-b872-4fac-9d56-7d24de34a30a/0a9956e4-845a-4dc9-8c48-6afc6488159a/3000x3000/arnaud-demanche.jpg',
  'Comédie',
  'Chaque matin, l''humoriste Arnaud Demanche parodie l''actualité politique et commente les messages des auditeurs avec humour.',
  false
),
(
  'RMC Poker Show',
  'RMC',
  'https://image.simplecastcdn.com/images/1fd73afa-ad51-414f-aa4b-53e39be70a2e/76e7a50f-f557-49dd-b3f2-2d1b01af83bc/3000x3000/rmc-poker-show.jpg',
  'Sport',
  'L''unique émission radio dédiée au poker, présentée par Daniel Riolo chaque dimanche soir.',
  false
),
(
  'Team Duga',
  'RMC',
  'https://image.simplecastcdn.com/images/d12623c0-c900-4878-b361-9c9ce548a872/7f369c07-8805-49c1-8070-f326f957f617/3000x3000/team-duga.jpg',
  'Sport',
  'Christophe Dugarry et ses chroniqueurs débattent du sport et de l''actualité avec franc-parler.',
  false
),

-- ─── PODCASTS POPULAIRES FRANÇAIS ───

(
  'LEGEND',
  'Guillaume Pley',
  'https://assets.pippa.io/shows/646cbb0bb160e00011df3980/1730108849125-446affaf-16be-4c2d-ab04-864b22a9a1b5.jpeg',
  'Société',
  'Guillaume Pley donne la parole à des personnalités aux parcours de vie extraordinaires, célèbres ou anonymes.',
  true
),
(
  'HugoDecrypte - Actus du jour',
  'Hugo Décrypte',
  'https://assets.pippa.io/shows/61365f9fb4ac8f42e6668a5c/1738677802833-946a38cb-7580-4ef9-ae27-145bddd37bd6.jpeg',
  'Actualité',
  'Chaque jour, Hugo résume et décrypte l''actualité en moins de 10 minutes de manière rapide et accessible.',
  true
),
(
  'Hondelatte Raconte',
  'Christophe Hondelatte',
  'https://static.audiomeans.fr/img/podcast/149b3984-c3a5-434b-b333-17c57e0091c3.jpg',
  'Société',
  'Christophe Hondelatte raconte des histoires captivantes de faits divers, parcours insolites et grands personnages.',
  true
),
(
  'Les Grosses Têtes',
  'Laurent Ruquier / RTL',
  'https://static.audiomeans.fr/img/podcast/d2ddde2b-d4a0-49f1-ba0b-f8b024bcae09.jpg',
  'Comédie',
  'L''univers hilarant des Grosses Têtes, émission culte animée par Laurent Ruquier avec anecdotes et quiz culturels.',
  true
),
(
  'Affaires Sensibles',
  'Fabrice Drouelle / France Inter',
  'https://www.radiofrance.fr/s3/cruiser-production/2023/04/7b50cf5f-f5bd-4dc4-8b1d-b08666768dcf/1400x1400_sc_affaires-sensibles.jpg',
  'Société',
  'Fabrice Drouelle revient sur les grandes affaires judiciaires, politiques et sociales qui ont marqué l''histoire récente.',
  false
),
(
  'Transfert',
  'Slate.fr',
  'https://static.audiomeans.fr/img/podcast/bf6ebbc6-bd22-4549-be03-f96df0247c07.jpg',
  'Société',
  'Chaque semaine, Transfert raconte une histoire vraie, passionnante et émouvante qui révèle la vie moderne.',
  false
),
(
  'Chroniques Criminelles',
  'Jacques Pradel / TFX',
  'https://static.audiomeans.fr/img/podcast/65e18b16-20cf-4a4b-8c2d-6ba7547671cf.jpg',
  'Société',
  'Jacques Pradel présente des enquêtes haletantes riches en rebondissements, grâce aux témoignages des enquêteurs.',
  false
),
(
  'Génération Do It Yourself',
  'Matthieu Stefani',
  'https://static.audiomeans.fr/img/podcast/b4a5ee3a-9230-4f9f-988d-2ae156a2d5a9.jpg',
  'Business',
  'Des interviews sans filtre d''entrepreneurs, sportifs et artistes qui partagent leurs parcours et leur quotidien.',
  false
),
(
  'La Terre au Carré',
  'Mathieu Vidard / France Inter',
  'https://www.radiofrance.fr/s3/cruiser-production/2022/09/la-terre-au-carre.jpg',
  'Science',
  'Mathieu Vidard explore la nature, le climat et les solutions pour comprendre le monde d''aujourd''hui et de demain.',
  false
),
(
  'L''Heure du Crime',
  'Jean-Alphonse Richard / RTL',
  'https://static.audiomeans.fr/img/podcast/de5ba943-e720-4988-a518-40404f231ff3.jpg',
  'Société',
  'Chaque jour, un événement, un crime ou un mystère judiciaire analysé par des spécialistes et des témoins.',
  false
);
