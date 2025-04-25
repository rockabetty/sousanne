import { handleDatabaseError } from '@errors'
import { ErrorKeys } from '@errors/errors.types'
import { queryDbConnection } from '@postgres'

/**
 * Identifies a restriction ID and confirms the name match.
 *
 * @param restrictionName The restriction name to check
 * @returns Promise<Restriction> - the restriction found in the database.
 */
export async function selectRestrictionByName(restrictionName: string) {
  try {
    const query = `
      SELECT *
      FROM dietary_restrictions
      WHERE lower(NAME) = $1
    `
    const normalizedInput = restrictionName.toLowerCase()
    const values = [normalizedInput]
    const result = await queryDbConnection(query, values)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Identifies a restriction ID and confirms existence.
 *
 * @param restrictionId The restriction ID to check
 * @returns Promise<Restriction> - the restriction found in the database.
 */
export async function selectRestrictionById(restrictionId: number) {
  try {
    const query = `
      SELECT *
      FROM dietary_restrictions
      WHERE id = $1
    `

    const values = [restrictionId]
    const result = await queryDbConnection(query, values)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Returns a list of restrictions in a given category.
 *
 * @param category The category to check
 * @returns Promise<Restriction> - the restriction found in the database.
 */
export async function selectRestrictionByCategory(
  category: 'AVERSION' | 'LIFESTYLE' | 'HEALTH'
) {
  try {
    const query = `
      SELECT *
      FROM dietary_restrictions
      WHERE category = $1
      ORDER BY name ASC
    `

    const values = [category]
    const result = await queryDbConnection(query, values)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Returns a list of restrictions
 *
 * @param restrictionId The restriction ID to check
 * @returns Promise<Restriction[]>  - later this will narrow down
 * to restrictions that have a matching path
 */
export async function selectRestrictions() {
  try {
    const query = `
      SELECT *
      FROM dietary_restrictions
    `

    const result = await queryDbConnection(query)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}
