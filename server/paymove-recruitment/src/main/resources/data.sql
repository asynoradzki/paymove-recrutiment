INSERT INTO app_users (firstname, lastname, email, password, role)
VALUES ('John', 'Twain', 'johntwain@xx.com', '$2a$10$Aqj4abmHhyQzqKeaH4M7o.IHxGML.1L9YwG0CChOXXEc5tXuZvoY.', 'USER'),
       ('Maryl', 'Streep', 'marylstreep@xx.com', '$2a$10$Aqj4abmHhyQzqKeaH4M7o.IHxGML.1L9YwG0CChOXXEc5tXuZvoY.',
        'USER'),
       ('Agatha', 'Christie', 'agatachristie@xx.com', '$2a$10$Aqj4abmHhyQzqKeaH4M7o.IHxGML.1L9YwG0CChOXXEc5tXuZvoY.',
        'ADMIN');

INSERT INTO items (offer_date, item_name, item_description, item_price, seller_id, purchase_date, buyer_id)
VALUES ('2024-01-25', 'Used electric kettle', 'Philips kettle 2-yrs old, not much used for sale', 1000, 1, null, null),
       ('2024-01-23', 'Cross country bike', '5-year old Trek Bird bike, in good condition', 20000, 2, null, null),
       ('2024-01-21', 'Used Sony Tv 55 inch', 'The TV is ok, but the remote controller missing', 10000, 3,
        '2024-01-22', 1),
       ('2024-01-24', 'Set of kitchen knives', 'Unused knives, got them as a wedding present', 10000, 3,
        '2024-01-22', 2),
       ('2024-01-24', 'Electric drill',
        'Makita drill, bought 3 years ago, has a few scratches, otherwise in good shape', 10000, 3,
        null, null);