INSERT INTO app_users (id, firstname, lastname, email, password, role)
VALUES (1, 'John', 'Twain', 'johntwain@xx.com', '$2a$10$N/Aeg0HBiha3seP9quwV/O4QWhpU1ud.71q1WRsJZmXchCq7FMY3m', 'USER'),
       (2, 'Maryl', 'Streep', 'marylstreep@xx.com', '$2a$10$VP4iTBBPW/XU5cp8.EWPz.5lg5pEh5e8quwuR2wYUXFh4IWVmHrdy',
        'USER'),
       (3, 'Agatha', 'Christie', 'agatachristie@xx.com', '$2a$10$sp/4WH15Prn90lQ0eW64G.DcVS472bguZQav.4Ty0pOwFVjs87epy',
        'ADMIN');

INSERT INTO items (item_id, offer_date, item_name, item_description, item_price, seller_id, purchase_date, buyer_id)
VALUES (1, '2024-01-25', 'Used electric kettle', 'Philips kettle 2-yrs old, not much used for sale', 10, 1, null, null),
       (2, '2024-01-23', 'Cross country bike', '5-year old Trek Bird bike, in good condition', 200, 2, null, null),
       (3, '2024-01-21', 'Used Sony Tv 55 inch', 'The TV is ok, but the remote controller missing', 100, 3,
        '2024-01-22', 1);