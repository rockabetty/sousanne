import { handleDatabaseError } from '@errors'
import { queryDbConnection, withTransaction } from '@postgres'
import { PriceModel } from './prices.types'

export async function selectRecipeIngredientPrices(slug: string) {
  try {
    const query = `
    WITH price_per_unit as (
      SELECT AVG(price_per_unit) AS cost, i.name, i.id, u.abbreviation AS unit 
      FROM prices pc 
      JOIN products pd ON pd.id = pc.product_id 
      JOIN ingredients i ON i.id = pd.ingredient_id
      JOIN recipe_ingredients ri ON ri.ingredient_id = i.id
      JOIN recipes r ON r.id = ri.recipe_id
      JOIN ingredient_hierarchy ih ON ih.id = i.ingredient_hierarchy_id
      JOIN units u ON u.id = ih.unit_id
      WHERE r.slug = $1
      GROUP BY i.name, i.id, u.abbreviation
    ) 
    SELECT jsonb_object_agg(price_per_unit.id, jsonb_build_object(
      'cost', cost,
      'ingredient', name, 
      'unit', unit
    )) AS data 
    FROM price_per_unit`
    const prices = await queryDbConnection(query, [slug])
    return prices.rows[0].data
  } catch (error) {
    handleDatabaseError(error)
  }
}

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
