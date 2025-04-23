import { handleDatabaseError } from '@errors'
import { queryDbConnection, withTransaction } from '@postgres'
import { PriceModel } from './prices.types'

/*
-- average prices per ingredient
select avg(price), i.name from prices pc 
join products pd on pd.id = pc.product_id 
join ingredients i on i.id = pd.ingredient_id
group by i.name

*/

export async function getPrices(productId: number): Promise<PriceModel[]> {
  try {
    const query = `
        SELECT
        *
        FROM prices p
        JOIN stores s ON
        s.id = p.store_id
        WHERE product_id = $1
    `
    // To do: When different stores in different zipcodes
    // are added we want to filter for appropriate stores.

    const values = [productId]
    const priceList = await queryDbConnection(query, values)
    return priceList.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

export async function insertPrices(
  productId: number,
  priceDataArray: PriceModel[],
  userId: number = 1
): Promise<PriceModel[]> {
  try {
    return await withTransaction(async (client) => {
      const insertPromises = priceDataArray.map(async (priceData) => {
        const { store_id, price, currencyId, userId } = priceData

        const query = `
        INSERT INTO prices
          (
            product_id,
            store_id,
            price,
            currency_id,
            user_id
          )
        VALUES
          (
            $1,
            $2,
            $3,
            $4,
            $5
          )
        RETURNING id, product_id, store_id, price, currency_id
        `

        const values = [productId, store_id, price, currencyId, userId]
        const result = await queryDbConnection(query, values, client)
        return result.rows[0]
      })

      return Promise.all(insertPromises)
    })
  } catch (error) {
    handleDatabaseError(error)
  }
}
