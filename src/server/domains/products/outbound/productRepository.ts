import { handleDatabaseError } from "@errors";
import { queryDbConnection, withTransaction } from "@postgres";

export async function insertOrSelectOneProductTemplate (templateData) {
  return withTransaction(async (client) => {
    const insertQuery=`
    INSERT INTO product_templates
    (
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    ON CONFLICT ON CONSTRAINT unique_product_templates DO NOTHING
    RETURNING id
    `;

    const {
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item
    } = templateData;

    const values=[
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item
    ];

    try {
        let newProductTemplate = await queryDbConnection(insertQuery, values);
        // if nothing was returned then it's possible it's due to the DO NOTHING
        // so let's double check. COALESCE is to account for potential null values
        if (newProductTemplate.rows.length == 0) {
          const selectQuery = `
            SELECT id
            FROM product_templates
            WHERE
            name = $1
            AND ingredient_id = $2
            AND unit_id = $3
            AND COALESCE(package_count, -1) = COALESCE($4, -1)
            AND COALESCE(display_quantity, -1) = COALESCE($5, -1)
            AND packaged_item = $6
          `;
          newProductTemplate = await queryDbConnection(selectQuery, values);
        }

        return newProductTemplate.rows[0]
        // Todo: specific error handling, e.g. tunique constraint violation
    } catch (error) {
        handleDatabaseError(error);
    }
  });
}

export async function insertOrSelectOneProduct(productData) {
    return withTransaction(async(client) => {
        const insertQuery = `INSERT INTO products
        (
            product_template_id,
            brand_id
        )
        VALUES 
        (
            $1,
            $2
        )
        ON CONFLICT ON
            (product_template_id, brand_id)
            DO NOTHING
        RETURNING id
        `;

        const values = [
            productData.product_template_id,
            productData.brand_id
        ];

        try {
            const newProduct = await queryDbConnection(insertQuery, values);
            if (newProduct.rows.length != 0) {
                return newProduct.rows[0].id;
            }
            const selectQuery = `
                SELECT id
                FROM products
                WHERE
                    product_template_id = $1 AND
                    brand_id = $2`;

            const selectedProduct = await queryDbConnection(selectQuery, values);
            return selectedProduct.rows[0].id;
        } catch (error) {
            handleDatabaseError(error);
        }
    });
};