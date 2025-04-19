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

    const insertQuery = `
    INSERT INTO products
    (
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item
      ${brand_id ? ', brand_id' : ''}
      ${product_id ? ', product_id' : ''}
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
      ${brand_id ? ', $7' : ''}
      ${product_id ? ', $8' : ''}
    )
    ON CONFLICT
      ON CONSTRAINT unique_products DO NOTHING
    RETURNING id
    `
    const values = [
      name,
      ingredient_id,
      unit_id,
      package_count,
      display_quantity,
      packaged_item,
    ]

    if (brand_id) {
      values.push(brand_id)
    }

    if (product_id) {
      values.push(product_id)
    }

    try {
      let newProduct = await queryDbConnection(insertQuery, values, client)

      // if there's a DO NOTHING it'll not return an ID, as it did nothing
      // but we still expect to see a product, probably.
      if (newProduct.rows.length === 0) {
        console.log('Attempting select')
        const selectQuery = `
          SELECT id
          FROM products
          WHERE
            name = $1
            AND ingredient_id = $2
            AND unit_id = $3
            AND COALESCE(package_count, -1) = COALESCE($4, -1)
            AND COALESCE(display_quantity, -1) = COALESCE($5, -1)
            AND packaged_item = $6
            ${brand_id ? 'AND COALESCE(brand_id, -1) = COALESCE($7, -1)' : ''}
            ${product_id ? 'AND COALESCE(product_id, -1) = COALESCE($8, -1)' : ''}
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
