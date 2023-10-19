import {queryDbConnection} from './queryhelpers';

export async function getProductsByIngredient (ingredient: number | string, columns: string[]): Promise<any[] | Error> {
    let identifyingColumn = "i.name"
    if (Number.isInteger(identifier)) {
        identifyingColumn = "i.id"
    }
    const desiredColumns = columns.length > 0 ? columns.join(", ") : "*";
    const query = `
        SELECT ${desiredColumns}
        FROM products p
        JOIN ingredients i ON
        i.id = p.ingredient_id
        WHERE ${identifyingColumn} = $1
        ORDER BY name ASC
    `;
    const values = [identifier]; 
    const result = await queryDbConnection(query, values);
    if (result instanceof Error) {
        return result;
    }
    return result.rows;
};

export async function getProducts (
        page: number = 0,
        perPage: number = 25,
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
     const values = [page, perPage];
     const result = await queryDbConnection(query, values); 
     if (result instanceof Error) {
        return result;
     }
     return result.rows;
}
