import { queryDbConnection } from "@postgres";
import { QueryResult } from 'pg';
import { handleDatabaseError } from "@errors"
import { Unit } from "../units.types";

export async function selectUnits(
  offset: number = 0,
  limit: number = 20
): Promise<Unit[] | null> {
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

export async function selectUnitByAbbreviation(
    unit: string
): Promise<Unit | null> {
    try {
        const query = `
        SELECT *
        FROM units
        WHERE lower(abbreviation) = $1
        LIMIT 1
        `;
        const values = [unit]
        const queryResult = await queryDbConnection(query, values)
        return queryResult.rows[0]
    } catch (error) {
        handleDatabaseError(error)
    }

}