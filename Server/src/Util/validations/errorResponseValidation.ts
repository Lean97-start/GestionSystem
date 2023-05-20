import { IError } from "../../Interface/error.Interface";

export const validateErrorResponse = (payload: any) => {
    if (payload.hasOwnProperty("error_message")) {
        throw {statusCode: payload.statusCode, error_message: payload.error_message}
    }
}