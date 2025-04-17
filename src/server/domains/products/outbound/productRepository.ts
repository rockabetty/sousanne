import { handleDatabaseError } from "@errors";
import { queryDbConnection, withTransaction } from "@postgres";

export async function createProductTemplate (templateData) {
  return withTransaction(async (client) => {
    const query=`
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
    RETURNING
      id
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
        const newProductTemplate = await queryDbConnection(query, values);
        return newProductTemplate.rows[0]
    } catch (error) {
        handleDatabaseError(error)
    }
  });
}