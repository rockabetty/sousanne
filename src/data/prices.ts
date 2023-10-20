import {queryDbConnection} from './queryhelpers';

export async function getPricesForIngredient (ingredient: number | string, limit: number = 25, offset: number = 0): Promise<any[] | Error> {
    let identifyingColumn = "LOWER(i.name)"
    if (typeof ingredient === 'number') {
        identifyingColumn = "i.id"
    }
  
    const query = `
        SELECT
            c.price,
            sale,
            sale_begins,
            sale_ends,
            b.id AS brand_id,
            b.name AS brand_name,
            p.id AS product_id,
            pt.name AS product_name,
            s.name AS store_name,
            s.id AS store_id,
            package_count,
            display_quantity,
            u.name AS unit_name,
            packaged_item
        FROM products p
        JOIN product_templates pt
          ON pt.id = p.product_template_id
        JOIN ingredients i 
          ON i.id = pt.ingredient_id
        JOIN brands b
          ON b.id = p.brand_id
        JOIN units u
          ON u.id = pt.unit_id
        JOIN prices c
          ON c.product_id = p.id
        JOIN stores s
          ON s.id = c.store_id
        WHERE ${identifyingColumn} = $1
        ORDER BY price ASC
        LIMIT $2
        OFFSET $3
    `;

    const values = [ingredient, limit, offset]; 
    const result = await queryDbConnection(query, values);
    if (result instanceof Error) {
        return result;
    }
    return result.rows;
};
