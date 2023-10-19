import {queryDbConnection} from './queryhelpers';

export async function getIngredients (
        page: number = 0,
        perPage: number = 25,
        columns: string[]
    ): Promise<any[] | Error> {
    let desiredColumns = "*";
    if (columns && columns.length > 0 ) {
        desiredColumns = columns.join(", ")
    }
    const query = `
        SELECT  ${desiredColumns}
        FROM ingredients
        ORDER BY name ASC
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

export async function searchIngredients (queryString: string, columns: string[]): Promise<any[] | Error> {
    const desiredColumns = columns.length > 0 ? columns.join(", ") : "*";
    const query = `
        SELECT ${desiredColumns}
        FROM ingredients
        WHERE name ILIKE $1
        ORDER BY name ASC
    `;
    const values = [`%${queryString}%`]; 
    const result = await queryDbConnection(query, values);
    if (result instanceof Error) {
        return result
    }
    return result.rows;
};

export async function getIngredientsByCategory (category: string, columns: string[]): Promise<any[] | Error> {
    const desiredColumns = columns.length > 0 ? columns.join(", ") : "*";
    const query = `
        SELECT ${desiredColumns}
        FROM ingredients
        WHERE path @> $1
        ORDER BY name ASC
    `;
    const values = [category]; 
    const result = await queryDbConnection(query, values);
    if (result instanceof Error) {
        return result;
    }
    return result.rows;
};

export async function getIngredient (identifier: number | string, columns: string[]): Promise<any[] | Error> {
    let identifyingColumn = "name"
    if (Number.isInteger(identifier)) {
        identifyingColumn = "id"
    }
    const desiredColumns = columns.length > 0 ? columns.join(", ") : "*";
    const query = `
        SELECT ${desiredColumns}
        FROM ingredients
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