-- Ricette di esempio per lo sviluppo.
-- L'Id non si indica: lo assegna PostgreSQL (colonna identity).
-- Negli apostrofi dentro il testo si usano due apici: 'dell''orto'.

INSERT INTO "Recipes" ("Title", "Description", "Servings") VALUES
  ('Pasta al pomodoro', 'Il classico intramontabile: pomodoro fresco, basilico e un filo d''olio.', 2),
  ('Risotto ai funghi porcini', 'Cremoso, mantecato con burro e parmigiano.', 4),
  ('Pasta alla Norma', 'Melanzane fritte, pomodoro e ricotta salata grattugiata.', 4),
  ('Frittata di zucchine', 'Veloce e leggera, perfetta per una cena improvvisata.', 2),
  ('Cotoletta alla milanese', NULL, 1),
  ('Lasagne alla bolognese', 'Strati di sfoglia, ragù e besciamella, gratinate in forno.', 6),
  ('Spaghetti alla carbonara', 'Uova, guanciale croccante, pecorino e pepe nero.', 2),
  ('Parmigiana di melanzane', 'Melanzane fritte a strati con pomodoro, mozzarella e parmigiano.', 6),
  ('Minestrone di verdure', 'Zuppa ricca di verdure di stagione, legumi e pasta corta.', 4),
  ('Pollo al limone', 'Petto di pollo in padella con una salsa leggera al limone.', 2),
  ('Insalata di farro', NULL, 3),
  ('Pesto alla genovese', 'Basilico, pinoli, aglio, parmigiano e olio extravergine, al mortaio.', 4),
  ('Polpette al sugo', 'Polpette morbide di carne cotte lentamente nel sugo di pomodoro.', 4),
  ('Vellutata di zucca', 'Dolce e avvolgente, con un tocco di rosmarino e crostini.', 4),
  ('Torta di mele', 'Soffice torta della nonna con mele a fettine e cannella.', 8),
  ('Tiramisù', 'Savoiardi al caffè, crema al mascarpone e cacao amaro.', 6),
  ('Pizza margherita', 'Impasto a lunga lievitazione, pomodoro, mozzarella e basilico.', 2),
  ('Salmone al forno', NULL, 2),
  ('Pasta e fagioli', 'Piatto povero e saporito della tradizione, denso e cremoso.', 4),
  ('Panna cotta ai frutti di bosco', 'Dessert al cucchiaio con coulis di frutti di bosco.', 4);
