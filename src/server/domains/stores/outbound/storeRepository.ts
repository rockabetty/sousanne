import { handleDatabaseError } from '@errors'
import { queryDbConnection } from '@postgres'
import { ErrorKeys } from '../errors.types'

export async function selectStores() {
  try {
    const query = `
        SELECT
            id, name, address, zipcode
        FROM
            stores
        `

    const queryResult = await queryDbConnection(query)
    return queryResult.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

export async function insertOrSelectOneStore(storeData) {
  try {
    const { name, street, state, city, zipcode } = storeData
    console.log(storeData)

    const address = `${street} ${city}, ${state}`
    console.log(address)
    const query = `
        INSERT INTO stores 
        (name, address, zipcode)
        VALUES
        ($1, $2, $3)
        ON CONFLICT ON CONSTRAINT unique_stores DO NOTHING
        RETURNING name, address, zipcode
        `
    const values = [name, address, zipcode]
    const queryResult = await queryDbConnection(query, values)

    if (queryResult.rows.length === 0) {
      const selectQuery = `
        SELECT 
            name, address, zipcode
        FROM stores 
        WHERE name = $1 AND address = $2 AND zipcode = $3
        `

      const selectResult = await queryDbConnection(selectQuery, values)
      if (selectResult.rows == 0) {
        handleDatabaseError(ErrorKeys.STORE_CREATION_FAILED)
      }
      return selectResult.rows[0]
    }
    return queryResult.rows[0]
  } catch (error) {
    handleDatabaseError(error)
  }
}
