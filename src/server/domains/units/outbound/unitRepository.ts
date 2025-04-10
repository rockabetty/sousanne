import { queryDbConnection } from "@postgres";
import { QueryResult } from 'pg';
import { handleDatabaseError } from "@errors"

export async function selectUnits(
  offset: number = 0,
  limit: number = 20
): Promise<Recipe[] | null> {
    try {
        const query = `
            SELECT *
            FROM units
            OFFSET $1
            LIMIT $2
        `;
        const values = [limit, offset]
        const queryResult = await queryDbConnection(query, values)
        return queryResult.rows
    } catch (error) {
        handleDatabaseError(error);
    }
};