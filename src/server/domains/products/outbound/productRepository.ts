import { handleDatabaseError } from "@errors";
import { queryDbConnection, withTransaction } from "@postgres";

export async function insertOrSelectOneProduct(productData) {
  return withTransaction(async (client) => {
    const {
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
      brand_id,
      product_template_id
    } = productData;

    const insertQuery = `
    INSERT INTO products
    (
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
      brand_id,
      product_template_id
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
    ON CONFLICT ON CONSTRAINT unique_products DO NOTHING
    RETURNING id
    `;
    
    const values = [
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
      brand_id,
      product_template_id
    ];
    
    try {
      let newProduct = await queryDbConnection(insertQuery, values, client);
      
      // if there's a DO NOTHING it'll not return an ID, as it did nothing
      // but we still expect to see a product, probably. 
      if (newProduct.rows.length === 0) {
        const selectQuery = `
          SELECT id
          FROM products
          WHERE
            name = $1
            AND ingredient_id = $2
            AND unit_id = $3
            AND COALESCE(package_count, -1) = COALESCE($4, -1)
            AND COALESCE(display_quantity, -1) = COALESCE($5, -1)
            AND packaged_item = $6
            AND COALESCE(brand_id, -1) = COALESCE($7, -1)
        `;
        
        newProduct = await queryDbConnection(selectQuery, values, client);
      }
      
      if (newProduct.rows.length === 0) {
        handleDatabaseError(ErrorKeys.FAILURE_TO_FINDSERT);
      }
      
      return newProduct.rows[0];
    } catch (error) {
      handleDatabaseError(error);
    }
  });
}