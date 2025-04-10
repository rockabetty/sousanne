import { selectUnits } from '../outbound/unitRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { handleServiceError } from "@errors";
import { ApiResponse } from '@errors/apiResponse.types';
import { Unit } from "../units.types";

export async function getUnits( limit: number = 20, offset: number = 0): Promise<ApiResponse<Unit[]>> {
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
