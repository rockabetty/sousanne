CREATE OR REPLACE FUNCTION calculate_price_per_unit()
RETURNS TRIGGER AS $$
DECLARE
  product_display_quantity DECIMAL;
  product_package_count DECIMAL;
BEGIN
  SELECT display_quantity, package_count INTO product_display_quantity, product_package_count 
  FROM products
  WHERE id = NEW.product_id;

  NEW.price_per_unit = NEW.price / GREATEST(1, product_display_quantity) * GREATEST(1, product_package_count);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_price_per_unit
BEFORE INSERT OR UPDATE ON prices
FOR EACH ROW
EXECUTE FUNCTION calculate_price_per_unit();