import { handleDatabaseError } from "@errors";
import { queryDbConnection, withTransaction } from "@postgres";

export async function insertOrSelectOneProduct (templateData) {
  return withTransaction(async (client) => {
    const insertQuery=`
    INSERT INTO product_templates
    (
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
      brand_id,
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
    ON CONFLICT ON CONSTRAINT unique_product_templates DO NOTHING
    RETURNING id
    `;

    const {
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
      brand_id
    } = templateData;

    const values=[
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
      brand_id
    ];

    try {
        let newProduct = await queryDbConnection(insertQuery, values);
        // if nothing was returned then it's possible it's due to the DO NOTHING
        // so let's double check. COALESCE is to account for potential null values
        if (newProduct.rows.length == 0) {
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
          newProduct = await queryDbConnection(selectQuery, values);
        }

        return newProduct.rows[0]
        // Todo: specific error handling, e.g. tunique constraint violation
    } catch (error) {
        handleDatabaseError(error);
    }
  });
};