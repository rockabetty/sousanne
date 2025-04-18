import { selectUnitByAbbreviation, selectUnits } from '../outbound/unitRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { ErrorKeys } from '../errors.types';
import { handleServiceError } from "@errors";
import { ApiResponse } from '@errors/apiResponse.types';
import { Unit } from "../units.types";
import { alphaNumericAndSpacingOnly } from '@server-services/sanitizer';

export async function getUnits(limit: number = 20, offset: number = 0): Promise<ApiResponse<Unit[]>> {
  try {
    const unitList  = await selectUnits(limit, offset);
    if (!!unitList) {
       return {
        success: true,
        data: unitList 
      };
    }
    return handleServiceError(CoreErrors.GENERAL_SERVER_ERROR);
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function getUnitByAbbreviation(query: string): Promise<ApiResponse<Unit>> {
  try {
    console.log("ooh lawd he tyring")
    const abbreviation = alphaNumericAndSpacingOnly(query);
    if (abbreviation) {
      const unit = await selectUnitByAbbreviation(abbreviation)
      if (!!unit) {
        return {
          success: true,
          data: unit
        }
      }
      return handleServiceError(ErrorKeys.UNIT_NOT_FOUND)
    }
    return handleServiceError(CoreErrors.INVALID_REQUEST)
  } catch (error) {
    return handleServiceError(error)
  }
}