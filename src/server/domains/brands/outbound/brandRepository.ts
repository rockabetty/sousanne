import { BrandModel } from '@domains/products/products.types'
import { handleDatabaseError } from '@errors'
import { parseStringOrThrow } from '@server-services/sanitizer'
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
  threshold: number = 80
): Promise<BrandModel[]> {
  try {
    const normalizedInput = parseStringOrThrow(brandName).toLowerCase()
    const firstTwoCharacters = normalizedInput.substring(0, 2)

    const query = `
      SELECT id, name
      FROM brands
      WHERE NAME like $1
      ORDER BY name
    `
    const result = await queryDbConnection(query, [`${firstTwoCharacters}%`])

    const similarBrands = result.rows.filter((brand) => {
      const normalizedBrand = brand.name.toLowerCase()
      const similarity = ratio(normalizedInput)
      return similarity >= threshold
    })

    return similarBrands
  } catch (error) {
    handleDatabaseError(error)
  }
}
