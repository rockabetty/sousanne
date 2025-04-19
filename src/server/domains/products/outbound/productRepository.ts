import { handleDatabaseError } from '@errors'
import { queryDbConnection, withTransaction } from '@postgres'
import { BrandedProduct, ProductModel } from '../products.types'
import { ErrorKeys } from '../errors.types'

export async function insertOrSelectOneProduct(productData: ProductModel) {
  return withTransaction(async (client) => {
    const {
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
      brand_id,
      product_id,
    } = productData

    const columns = [
      'name',
      'ingredient_id',
      'unit_id',
      'package_count',
      'display_quantity',
      'packaged_item',
    ]

    const values = [
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
    ]

    let placeholders = ['$1', '$2', '$3', '$4', '$5', '$6']
    let paramIndex = 6

    if (brand_id) {
      columns.push('brand_id')
      values.push(brand_id)
      placeholders.push(`$${++paramIndex}`)
    }

    if (product_id) {
      columns.push('product_id')
      values.push(product_id)
      placeholders.push(`$${++paramIndex}`)
    }

    const insertQuery = `
      INSERT INTO products (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      ON CONFLICT ON CONSTRAINT unique_products DO NOTHING
      RETURNING id`

    try {
      let newProduct = await queryDbConnection(insertQuery, values, client)

      // if there's a DO NOTHING it'll not return an ID, as it did nothing
      // but we still expect to see a product, probably.
      if (newProduct.rows.length === 0) {
        const conditions = [
          'name = $1',
          'ingredient_id = $2',
          'unit_id = $3',
          'COALESCE(package_count, -1) = COALESCE($4, -1)',
          'COALESCE(display_quantity, -1) = COALESCE($5, -1)',
          'packaged_item = $6',
        ]
        let paramIndex = 6

        if (brand_id) {
          paramIndex++
          conditions.push(
            `COALESCE(brand_id, -1) = COALESCE($${paramIndex}, -1)`
          )
        }

        if (product_id) {
          paramIndex++
          conditions.push(
            `COALESCE(product_id, -1) = COALESCE($${paramIndex}, -1)`
          )
        }

        const selectQuery = `
          SELECT id
          FROM products
          WHERE ${conditions.join(' AND ')}
        `
        newProduct = await queryDbConnection(selectQuery, values, client)
      }

      if (newProduct.rows.length === 0) {
        handleDatabaseError(ErrorKeys.FAILURE_TO_FINDSERT)
      }

      return newProduct.rows[0]
    } catch (error) {
      handleDatabaseError(error)
    }
  })
}

export async function insertOrSelectOneBrandedProduct(
  productData: BrandedProduct
) {
  return withTransaction(async (client) => {
    const { brand_id, product_id } = productData

    const insertQuery = `
    INSERT INTO products
    (
      brand_id,
      product_id
    )
    VALUES
    (
      $1,
      $2,
    )
    ON CONFLICT
      ON CONSTRAINT unique_product_brands DO NOTHING
    RETURNING id
    `

    const values = [brand_id, product_id]

    try {
      let newProduct = await queryDbConnection(insertQuery, values, client)

      // if there's a DO NOTHING it'll not return an ID, as it did nothing
      // but we still expect to see a product, probably.
      if (newProduct.rows.length === 0) {
        const selectQuery = `
          SELECT id
          FROM products
          WHERE
            brand_id = $1
            AND product_id = $2
        `
        newProduct = await queryDbConnection(selectQuery, values, client)
      }

      if (newProduct.rows.length === 0) {
        handleDatabaseError(ErrorKeys.FAILURE_TO_FINDSERT)
      }

      return newProduct.rows[0]
    } catch (error) {
      handleDatabaseError(error)
    }
  })
}
