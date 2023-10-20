import {queryDbConnection} from './queryhelpers';

export async function getProductsByIngredient (ingredient: number | string): Promise<any[] | Error> {
    let identifyingColumn = "LOWER(i.name)"
    if (typeof ingredient === 'number') {
        identifyingColumn = "i.id"
    }
  
    const query = `
        SELECT
            b.id AS brand_id,
            b.name AS brand_name,
            p.id AS product_id,
            pt.name AS product_name,
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
        WHERE ${identifyingColumn} = $1
        ORDER BY pt.name ASC
    `;

    const values = [ingredient]; 
    const result = await queryDbConnection(query, values);
    if (result instanceof Error) {
        return result;
    }
    return result.rows;
};

export async function getProducts (
        offset: number = 0,
        limt: number = 25,
        columns: string[]
    ): Promise<any[] | Error> {
    let desiredColumns = "*";
    if (columns && columns.length > 0 ) {
        desiredColumns = columns.join(", ")
    }
    const query = `
        SELECT 
            b.id AS brand_id,
            b.name AS brand_name,
            p.id AS product_id,
            pt.name AS product_name,
            package_count,
            display_quantity,
            u.name AS unit_name,
            packaged_item 
        FROM products p
        JOIN product_templates pt
          ON pt.id = p.product_template_id
        JOIN brands b
          ON b.id = p.brand_id
        JOIN units u
          ON u.id = pt.unit_id
        ORDER BY pt.name ASC
        OFFSET $1
        LIMIT $2
    `;
     const values = [offset, limit];
     const result = await queryDbConnection(query, values); 
     if (result instanceof Error) {
        return result;
     }
     return result.rows;
}
