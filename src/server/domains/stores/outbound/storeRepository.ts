import { handleDatabaseError } from "@errors";
import { queryDbConnection } from "@postgres";

export async function selectStores () {
    try {
        const query = `
        SELECT
            id, name, address, zipcode
        FROM
            stores
        `;

        const queryResult = await queryDbConnection(query)
        return queryResult.rows
    }
    catch (error) {
        handleDatabaseError(error)
    }

}