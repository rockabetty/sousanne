import { handleServiceError } from '@errors'
import {
  selectRestrictionById,
  selectRestrictions,
  selectRestrictionByCategory,
} from '../outbound/restrictionRepository'
import { ErrorKeys as CoreErrors } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'

export async function getRestriction(id: number) {
  try {
    const restriction = await selectRestrictionById(id)
    if (!restriction || restriction.length === 0) {
      return {
        success: false,
        error: ErrorKeys.RESTRICTION_NOT_FOUND,
      }
    }

    return {
      success: true,
      data: restriction[0],
    }
  } catch (error) {
    return handleServiceError(error)
  }
}

export async function getRestrictionsByCategory(category: string) {
  try {
    const restrictions = await selectRestrictionByCategory(category)
    if (!restrictions || restrictions.length === 0) {
      return {
        success: false,
        error: ErrorKeys.RESTRICTION_NOT_FOUND,
      }
    }

    return {
      success: true,
      data: restrictions,
    }
  } catch (error) {
    return handleServiceError(error)
  }
}

export async function getRestrictions() {
  try {
    const restrictions = await selectRestrictions()
    return {
      success: true,
      data: restrictions,
    }
  } catch (error) {
    return handleServiceError(error)
  }
}
