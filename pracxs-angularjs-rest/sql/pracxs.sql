-- Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
-- You may use, distribute and modify this script under the
-- terms of the Prometheus courses license.
--
-- You should have received a copy of the Prometheus courses
-- license.If not, please write to: prometheus@pracxs.com
-- or to prometheus@itce.com

-- Create the database
CREATE SCHEMA IF NOT EXISTS pracxs_angularjs
    DEFAULT CHARACTER SET utf8;
    
-- Make our database default for all SQLs
USE pracxs_angularjs;

-- Create database user
-- CREATE USER 'pracxs'@'%' IDENTIFIED BY 'Password@1';
GRANT ALL PRIVILEGES ON pracxs_angularjs.* TO 'pracxs'@'%';

-- Create Users table
CREATE TABLE users
(
  id          INT NOT NULL AUTO_INCREMENT ,
  email       VARCHAR(200) NOT NULL COMMENT 'The email is used for login' ,
  first_name  VARCHAR(100) NULL ,
  last_name   VARCHAR(100) NOT NULL ,
  `password`  VARCHAR(100) NOT NULL ,
  PRIMARY KEY pk_users(id) ,
  UNIQUE INDEX uix_users_email (email)
)
ENGINE = InnoDB, 
COMMENT = 'Stores all system users, incliding login mail and password' ;

INSERT INTO users(email, first_name, last_name, password)
    VALUES  ('ivan@pracxs.com', 'Ivan', 'Ivanov', 'Password@1'),
            ('dimitar@pracxs.com', 'Dimitar', 'Dimitrov', 'Password@1');

-- Create Menu Items table
CREATE TABLE menu_categories
(
    id            INT NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(100) NOT NULL,
    `order`       INT NULL COMMENT 'Supplies to the application the categories UI order',
    PRIMARY KEY pk_menu_categories(id),
    UNIQUE INDEX uix_menu_categories_name (`name`),
    INDEX ix_menu_categories_order(`order`)
)
ENGINE = InnoDB, 
COMMENT = 'Stores list of menu item categories like: salads, main courses, etc.';

INSERT INTO menu_categories(id, `name`, `order`)
    VALUES  (1, 'Салати', '10'),
            (2, 'Предястия', 20),
            (3, 'Супи', 30),
            (4, 'Аламинути', 40),
            (5, 'Основни ястия', 50),
            (6, 'Гарнитури', 60),
            (7, 'Десерти', 70),
            (8, 'Напитки',100);

-- Create Menu Items table
CREATE TABLE menu_items
(
  id            INT NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(100) NOT NULL,
  price         DECIMAL(8,2) NOT NULL COMMENT 'The price of the item at the moment',
  description   VARCHAR(500) NULL COMMENT 'Descibtion of the item in the menu like what are ingradients or what is it weight',
  category_id   INT NOT NULL COMMENT 'FK to the item''s category',
  quantity      INT NOT NULL COMMENT 'Aviable quantities of the item',
  `order`       INT NULL COMMENT 'Supplies to the application the items UI order. The order applies within the item''s category',
  PRIMARY KEY pk_menu_items(id) ,
  UNIQUE INDEX uix_menu_items_name_category (`name`, category_id),
  INDEX ix_menu_items_category(category_id),
  CONSTRAINT fk_menu_items_2_categories FOREIGN KEY (category_id) REFERENCES menu_categories(id),
  INDEX ix_menu_items_order(category_id, `order`),
  CONSTRAINT ch_menu_items_price CHECK (price>=0)
)
ENGINE = InnoDB, 
COMMENT = 'Stores list of menu items';

INSERT INTO menu_items(`name`, price, description, category_id, `order`, quantity)
    VALUES  ('Шопска салата', 3.5, 'На къде без нея с печени чушки и червен лук', 1, 10, 10),
            ('Салата домати', 2.9, 'На много големи кръгчета', 1, 20, 10),
            ('Салата краставици', 2.8, 'И тази е на много кръгчета', 1, 30, 10),
            ('Овчарска салата', 6.1, 'Мокрите сънища на овчарите', 1, 40, 10),
            ('Зелена салата', 3.1, 'Идеална за лятото и зимата', 1, 50, 10),
            
            ('Пилешки дробчета', 3.1, 'Не става за вегетарианци', 2, 10, 10),
            ('Ориз със зеленчуци', 3.7, 'За вегетарианци, но не веганци', 2, 20, 10),
            ('Пържени картофи', 3.1, 'Още известни като ПКС', 2, 30, 10),
            ('Пържени картофи със сирене', 3.8, 'и ПКС със сирене', 2, 40, 10),
            ('Кашкавал натюр', 2.5, 'Това кой го яде', 2, 50, 10),
            ('Луканка', 3.1, 'Домашна за ценители', 2, 60, 10),
            
            ('Таратор', 2.9, 'Без крастваици и без кисело мляко', 3, 10, 10),
            ('Шкембе чорба', 2.7, 'На следващата сутрин', 3, 20, 10),
            
            ('Шницел по виенски', 12.1, 'Отнема време докато пристигне от Виена', 5, 10, 10),
            ('Рамстек с лук', 8.69, 'Не го знам какво е ама виж колко лук има', 5, 20, 10),
            ('Пържени кюфтета', 5.5, 'Кюфтета на баба или може би на дядо не помня', 5, 30, 10),
            
            ('Бисквитена торта', 3.49, 'Не е домашна ама става', 7, 10, 10),
            ('Домашен сладолед', 3.29, 'Е този вече е домашен ама не е френска нуга', 7, 20, 10);
            
-- Create Orders table
CREATE TABLE orders
(
  id            BIGINT NOT NULL AUTO_INCREMENT,
  confirm_date   DATETIME NOT NULL COMMENT 'When the order was confirmed to the user as ordered',
  guid          VARCHAR(40) NOT NULL COMMENT 'Unique identifier of order created before persist it. The navigation rely on it',
  discount      DECIMAL(34,2) NOT NULL COMMENT 'Applied discount amount.',
  user_id       INT NOT NULL COMMENT 'The user made the order.',
  PRIMARY KEY pk_orders(id) ,
  UNIQUE INDEX uix_orders_guid(guid),
  INDEX ix_orders_user_id(user_id),
  CONSTRAINT fk_orders_2_users FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT ch_orders_discount CHECK (discount>=0),
  CONSTRAINT ch_orders_discount CHECK (LENGTH(guid)>0)
)
ENGINE = InnoDB, 
COMMENT = 'Stores confirmed orders';

-- Create Order Items table
CREATE TABLE order_items
(
  id            BIGINT NOT NULL AUTO_INCREMENT,
  order_id      BIGINT NOT NULL COMMENT 'The order that this item belongs to.',
  menu_item_id  INT NOT NULL COMMENT 'Menu item that was ordered.',
  price         DECIMAL(8,2) NOT NULL COMMENT 'The price for one item.',
  quantity      INT NOT NULL COMMENT 'Ordered quantity of this item.',
  PRIMARY KEY pk_order_items(id) ,
  UNIQUE INDEX uix_order_items(order_id, menu_item_id),
  INDEX ix_order_items_order_id(order_id),
  INDEX ix_order_items_user_id(menu_item_id),
  CONSTRAINT fk_order_items_2_orders FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_order_items_2_menu_items FOREIGN KEY (menu_item_id) REFERENCES menu_items(id),
  CONSTRAINT ch_order_items_price CHECK (price>=0),
  CONSTRAINT ch_order_items_quantity CHECK (quantity>0)
)
ENGINE = InnoDB, 
COMMENT = 'Stores ordered item of a confirmed order';
            