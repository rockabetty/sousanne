import { BrandModel } from '@domains/products/products.types'
import { handleDatabaseError } from '@errors'
import { ErrorKeys } from '@errors/errors.types'
import { queryDbConnection } from '@postgres'
import {
  parseIntegerOrThrow,
  parseStringOrThrow,
} from '@server-services/sanitizer'
import { ratio } from 'fuzzball/ultra_lite'

/**
 * Finds brand matches in the database that are similar to the provided name.
 *
 * @param brandName The brand name to check
 * @param threshold The similarity threshold (0-1, higher means more similar)
 * @returns Promise<Brand[]> Array of similar brands already in the database
 */
export async function selectSimilarBrands(
  brandName: string,
  threshold: number = 80,
  offset: number = 0,
  limit: number = 10
): Promise<BrandModel[]> {
  try {
    const normalizedInput = parseStringOrThrow(brandName).toLowerCase()
    const firstTwoCharacters = normalizedInput.substring(0, 2)

    const query = `
      SELECT id, name
      FROM brands
      WHERE NAME like $1
      ORDER BY name
      OFFSET $2
      LIMIT $3
    `
    const values = [`${firstTwoCharacters}%`]
    const result = await queryDbConnection(query, values)

    const similarBrands = result.rows.filter((brand: BrandModel) => {
      const normalizedBrand = brand.name.toLowerCase()
      const similarity = ratio(normalizedInput, normalizedBrand)
      return similarity >= threshold
    })

    return similarBrands
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Identifies a brand ID and confirms the name match.
 *
 * @param brandName The brand name to check
 * @returns Promise<Brand> - the brand found in the database.
 */
export async function selectBrandByName(brandName: string) {
  try {
    const query = `
      SELECT id, name
      FROM brands
      WHERE lower(NAME) = $1
    `
    const normalizedInput = parseStringOrThrow(brandName).toLowerCase()
    const values = [normalizedInput]
    const result = await queryDbConnection(query, values)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Identifies a brand ID and confirms existence.
 *
 * @param brandId The brand ID to check
 * @returns Promise<Brand> - the brand found in the database.
 */
export async function selectBrandById(brandId: number) {
  try {
    const query = `
      SELECT id, name
      FROM brands
      WHERE id = $1
    `

    const values = [brandId]
    const result = await queryDbConnection(query, values)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Returns a list of brands
 *
 * @param brandId The brand ID to check
 * @returns Promise<Brand[]>  - later this will narrow down
 * to brands that have a matching path
 */
export async function selectBrands() {
  try {
    const query = `
      SELECT *
      FROM brands
    `

    const result = await queryDbConnection(query)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Creates a new brand in the database.
 *
 * @param brandData The brand data to create
 * @returns Promise<{id: number}> The ID of the newly created brand
 */
export async function insertBrand(brandData: {
  name: string
}): Promise<{ id: number }> {
  try {
    const query = `
      INSERT INTO brands
      (name)
      VALUES
      ($1)
      RETURNING id
    `
    const values = [brandData.name]
    const result = await queryDbConnection(query, values)

    if (result.rows.length === 0) {
      handleDatabaseError(new Error('Failed to insert brand'))
    }

    return result.rows[0]
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Updates an existing brand in the database.
 *
 * @param id The ID of the brand to update
 * @param brandData The updated brand data
 * @returns Promise<BrandModel> The updated brand
 */
export async function updateBrand(
  id: number,
  brandData: { name: string }
): Promise<BrandModel> {
  try {
    const query = `
      UPDATE brands
      SET name = $1
      WHERE id = $2
      RETURNING id, name
    `
    const values = [brandData.name, id]
    const result = await queryDbConnection(query, values)

    if (result.rows.length === 0) {
      handleDatabaseError(new Error('Brand not found'))
    }

    return result.rows[0]
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Deletes a brand from the database.
 *
 * @param id The ID of the brand to delete
 * @returns Promise<boolean> True if the brand was deleted, false otherwise
 */
export async function deleteBrand(id: number): Promise<boolean> {
  try {
    const query = `
      DELETE FROM brands
      WHERE id = $1
      RETURNING id
    `
    const values = [id]
    const result = await queryDbConnection(query, values)

    return result.rows.length > 0
  } catch (error) {
    handleDatabaseError(error)
  }
}
