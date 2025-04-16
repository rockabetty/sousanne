CREATE TYPE seasonality AS ENUM ('IN_SEASON', 'STORAGE', 'NON_SEASONAL');
    
CREATE EXTENSION IF NOT EXISTS ltree;

CREATE TABLE IF NOT EXISTS currencies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), -- e.g. "dollars"
    currency_code VARCHAR(4), -- e.g. "USD"
    currency_symbol VARCHAR(4) -- e.g. "$"
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    budget INT DEFAULT 0,
    currency_id INT REFERENCES currencies(id)
);

/*
  Food recommendations can be calculated but will generally require knowing
  how old you are and, speaking reductively, whether you're a man/woman/neither
  since the hormonal slant of your body will determine protein goals.
*/

CREATE TYPE nutritional_gender AS ENUM ('TESTOSTERONE_DOMINANT', 'ESTROGEN_DOMINANT', 'NEITHER');
CREATE TYPE age_range AS ENUM (
    'TODDLER', -- 12 - 23 mos
    'YOUNG CHILD', -- 2 - 3 years
    'CHILD', -- 4 - 8 years
    'PRE-TEEN', -- 9 to 13
    'TEENAGER', -- 14 to 18
    'YOUNG ADULT', -- 19 to 30
    'ADULT', -- 31 to 59
    'SENIOR' -- 60+ 
);

CREATE TABLE IF NOT EXISTS household_members(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    gender nutritional_gender DEFAULT 'NEITHER',
    age age_range DEFAULT 'YOUNG ADULT'
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT REFERENCES locations(id)
);

CREATE TABLE IF NOT EXISTS tax_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tax_rules (
    id SERIAL PRIMARY KEY,
    tax_type_id INT REFERENCES tax_types(id),
    location_id INT REFERENCES locations(id), -- assuming map_locations is your locations table
    rate DECIMAL(5,2), -- Tax rate as a percentage, e.g., 10.25 for 10.25%
    description TEXT,
    start_date DATE,
    end_date DATE
);

-- Measurement units, e.g. fluid ounces, pounds, grams
CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    is_volume BOOLEAN,
    abbreviation VARCHAR(6)
);

CREATE TABLE ingredient_hierarchy (
    id SERIAL PRIMARY KEY,
    path ltree,
    -- shelf life is measured in days
    shelf_life_room_temp_sealed INT,
    shelf_life_room_temp_open INT,
    shelf_life_refrigerated_open INT,
    shelf_life_refrigerated_sealed INT,
    shelf_life_frozen INT,
    /* 
      Recipes should auto-decrement ingredients where possible when completed.
      Ingredients consume units of things, e.g. 'a cup of...' in a recipe.
      Though recipes have variable units themselves (e.g. a tablespoon vs a cup)
      we will use how much a cup of X weighs to figure out how much you're rid of.
      With produce items e.g. onions, peppers, the avg. weight of one is for 
    */
    cup_weight DECIMAL(5,2),
    average_weight DECIMAL(5,2),
    edible_percentage DECIMAL (5,2) DEFAULT 100.0, -- e.g. chicken drumsticks have a bone in 'em, you can't eat it all.
    cooking_yield_percentage DECIMAL(5,2) DEFAULT 1.0, -- e.g. rice triples in size, so you buy 1 lb and can cook 3 lbs of it.
    description VARCHAR(512),
    unit_id INT REFERENCES units(id),
    no_room_temp_storage BOOLEAN,
    no_refrigerated_storage BOOLEAN,
    no_freezer_storage BOOLEAN
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredient_hierarchy_id INT NOT NULL REFERENCES ingredient_hierarchy(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    archetype BOOLEAN DEFAULT FALSE,
    weight_multiplier DECIMAL (5,2)
);
alter table ingredients add constraint uc_name unique (name);


-- To generate a list of dietary restrictions e.g. 'vegan', 'kosher'.
CREATE TABLE dietary_restrictions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

-- For enabling users to say "We're vegan" or "no peanut products", etc.
CREATE TABLE IF NOT EXISTS user_ingredient_restriction_rules (
    user_id INT NOT NULL REFERENCES users(id),
    ingredient_hierarchy_restriction_id INT NOT NULL REFERENCES ingredient_hierarchy(id)
);

/*
  For things like fish sauce or anchovy paste where a food allergen or other such item 
  is a constituent part, e.g. peanut oil hiding in a condiment.
*/
CREATE TABLE ingredient_composition (
    -- recipe_ingredient is the item to exclude, e.g. marzipan
    recipe_ingredient_id INTEGER NOT NULL REFERENCES ingredients(id),
    -- constituent parts, e.g. almonds, egg whites, sugar, which makes marzipan 
    contains_ingredient_id INTEGER NOT NULL REFERENCES ingredients(id),
    PRIMARY KEY (recipe_ingredient_id, contains_ingredient_id)
);

CREATE TABLE climate_regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE ingredient_seasonality (
    ingredient_id INTEGER NOT NULL REFERENCES ingredients(id),
    region_id INTEGER NOT NULL REFERENCES climate_regions(id),
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    status seasonality NOT NULL DEFAULT 'NON_SEASONAL',
    PRIMARY KEY (ingredient_id, region_id, month)
);

CREATE TABLE IF NOT EXISTS ingredients_taxes (
    id SERIAL PRIMARY KEY,
    tax_type_id INT REFERENCES tax_types(id),
    ingredient_id INT REFERENCES ingredients(id)
);

CREATE TABLE IF NOT EXISTS origins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT REFERENCES origins(id)
);

CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    zipcode INT, -- we'll worry bout something more advanced later
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_locations UNIQUE (address, zipcode)
);


CREATE TABLE IF NOT EXISTS product_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredient_id INT REFERENCES ingredients(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- ounces, pounds, grams, millilitres, etc.
    unit_id INT REFERENCES units(id),
    -- for comparison purposes, the smallest amount this product can be divided into
    base_quantity INT DEFAULT 1,
    -- when false, the item is sold by the unit (e.g. per pound)
    packaged_item BOOLEAN default FALSE,
    -- the number of packages in the product.  The 4-pack of tuna cans would be '4', a half gallon of whole milk would be '1'
    package_count INT,
    -- the quantity of each package for displaying to the user; 4-pack of tuna cans would be '5', half gallon of milk would be '64' (ounces)
    display_quantity INT
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
    origin_id INT references origins(id)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE products_tags (
    id SERIAL PRIMARY KEY,
    tag_id INT REFERENCES tags(id),
    product_template_id INT REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS prices (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    store_id INT REFERENCES stores(id),
    price DECIMAL(10, 2) NOT NULL,
    currency_id INT REFERENCES currencies(id),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sale BOOLEAN default FALSE,
    sale_begins TIMESTAMP,
    sale_ends TIMESTAMP,
    user_id INT REFERENCES users(id),
    price_by_measurement BOOLEAN DEFAULT FALSE,
    CONSTRAINT positive_price CHECK (price > 0)
);

CREATE TABLE IF NOT EXISTS grocery_lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT REFERENCES users(id),
    archived TIMESTAMP, 
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS grocery_lists_items (
    id SERIAL PRIMARY KEY,
    grocery_list_id INT REFERENCES grocery_lists(id),
    ingredient_id INT REFERENCES ingredients(id),
    product_id INT REFERENCES products(id),
    price_id INT REFERENCES prices(id),
    obtained BOOLEAN DEFAULT FALSE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE meal AS ENUM (
    'BREAKFAST',
    'LUNCH',
    'DINNER',
    'DESSERT',
    'SNACK',
    'DRINK',
    'SIDE'
);

CREATE TABLE IF NOT EXISTS cuisines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT REFERENCES cuisines(id)
);

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    -- Recipe is submitted by a user or is a default recipe.
    user_id INT REFERENCES users(id),
    -- recipes are made public after manual review
    is_public BOOLEAN DEFAULT FALSE,
    cuisine_id INT REFERENCES cuisines(id),
    base_serving_size INT NOT NULL DEFAULT 1,
    -- times are in minutes
    wait_time INT, -- e.g. overnight oats, recipes that must ferment, etc.
    active_prep_time INT, -- time doing mise en place
    cook_time INT,        -- time that it's grilling, baking, frying, etc. 
    oven_preheat INT,
    rating DECIMAL(10,2),
    CONSTRAINT unique_slug UNIQUE (slug)
);


CREATE TYPE preparation AS ENUM (
    'WHOLE',
    'SLICE',
    'CHOP',
    'DICE',
    'MINCE',
    'JULIENNE',
    'BRUNOISE',
    'PUREE',
    'CUBE',
    'CHIFFONADE',
    'MELT'
);

/*
  For the purposes of being able to rule out recipes based on an action that you
  cannot take due to disability.  This is to acommodate people in for example
  dormroom environments where there is no stove and meals must be microwaved
  or people with arthritis, chronic pain, or some other disability. 
*/
CREATE TYPE accessibility_concern AS ENUM (
    'MOTOR_SKILLS', -- e.g. devein", "peel"
    'STRENGTH_OR_ENDURANCE' -- e.g. "knead", "grate"
);

CREATE TABLE IF NOT EXISTS cooking_actions (
    id SERIAL PRIMARY KEY,
    -- e.g. "boil", "bake", "peel", "chop", "shell", 
    name VARCHAR(50) NOT NULL,
    requirement accessibility_concern
);

CREATE TABLE IF NOT EXISTS recipe_sections (
    -- For recipes that have multiple parts, e.g. a cheesecake:
    -- "For the batter" vs "for the filling" vs "For the crust"
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL REFERENCES recipes(id),
    ingredient_id INT NOT NULL REFERENCES ingredients(id),
    section_id INT REFERENCES recipe_sections(id),
    -- if a recipe callsf or '3 tablespoons', then unit_id would be for the id of 'tablespoon'
    unit_id INT NOT NULL REFERENCES units(id),
    -- in our 3 tablespoons example, amount would be 3.
    amount DECIMAL(10,2) NOT NULL,
    variant preparation,
    from_scratch_recipe_id INT REFERENCES recipes(id)
);


CREATE TABLE IF NOT EXISTS recipe_steps (
    id SERIAL PRIMARY KEY,
    step_order INT NOT NULL,
    section_id INT REFERENCES recipe_sections(id),
    recipe_id INT NOT NULL REFERENCES recipes(id),
    cooking_action_id INT REFERENCES cooking_actions(id),
    -- e.g. "boil the pasta for 20 minutes"
    instruction VARCHAR(255) NOT NULL
);

CREATE TYPE storage_type AS ENUM (
    'SHELF_SEALED',
    'SHELF_OPEN', -- sliced produced counts as 'open'
    'REFRIGERATED_SEALED',
    'REFRIGERATED_OPEN', -- sliced produced counts as 'open'
    'FROZEN',
    'EXPIRED',
    'CONSUMED'
);

CREATE TABLE IF NOT EXISTS pantries (
    user_id INT NOT NULL REFERENCES users(id),
    ingredient_id INT NOT NULL REFERENCES ingredients(id),
    purchased_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status storage_type,
    amount_purchased DECIMAL(10,2) NOT NULL DEFAULT 1.0,
    amount_consumed DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    expires_on TIMESTAMP
);

-- For hierarchy operations using ltree
CREATE INDEX idx_ingredient_hierarchy_path ON ingredient_hierarchy USING GIST (path);
CREATE INDEX idx_ingredient_hierarchy_path_btree ON ingredient_hierarchy USING BTREE (path);

-- For composition lookups (finding what contains a specific ingredient)
CREATE INDEX idx_ingredient_composition_contains ON ingredient_composition(contains_ingredient_id);

-- For seasonality queries
CREATE INDEX idx_ingredient_seasonality_lookup ON ingredient_seasonality(region_id, month, status);

-- for fuzzy searching - 
CREATE EXTENSION IF NOT EXISTS   pg_trgm;
