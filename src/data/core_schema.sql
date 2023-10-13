CREATE EXTENSION IF NOT EXISTS ltree;

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path ltree
);

CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Measurement units, e.g. fluid ounces, pounds, grams
CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    base_unit VARCHAR(50),
    conversion_factor DECIMAL(10, 5)
);

CREATE TABLE IF NOT EXISTS origins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT REFERENCES origins(id)
);

CREATE TABLE IF NOT EXISTS product_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredient_id INT REFERENCES ingredients(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- shelf life is measured in days
    shelf_life_room_temp INT,
    shelf_life_refrigerated_opened INT,
    shelf_life_refrigerated_sealed INT,
    shelf_life_frozen INT,
    origin_id INT references origins(id)
);

-- Brands are vendors like "Niman Ranch", "Sarah Lee"
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_template_id INT references product_templates(id),
    brand_id INT references brands(id),
    -- ounces, pounds, grams, millilitres, etc.
    unit_id REFERENCES units(id),
    -- for comparison purposes, the smallest amount this product can be divided into
    base_quantity INT DEFAULT 1,
    -- when false, the item is sold by the unit (e.g. per pound)
    packaged_item BOOLEAN default FALSE,
    -- the number of packages in the product.  The 4-pack of tuna cans would be '4', a half gallon of whole milk would be '1'
    package_count INT,
    -- the quantity of each package for displaying to the user; 4-pack of tuna cans would be '5', half gallon of milk would be '64' (ounces)
    display_quantity INT,
    -- normalized quantity for comparison in the base unit, e.g. milliliters
    comparison_quantity INT
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE product_template_tags (
    id SERIAL PRIMARY KEY,
    tag_id INT REFERENCES tags(id),
    product_template_id INT REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS prices (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    store_id INT REFERENCES stores(id),
    price DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sale BOOLEAN default FALSE,
    sale_begins TIMESTAMP,
    sale_ends TIMESTAMP,
    user_id INT REFERENCES users(id)
);

-- Index for ltree to speed up queries
CREATE INDEX ingredients_path_gist ON ingredients USING gist(path);