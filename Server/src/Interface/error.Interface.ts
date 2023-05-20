export interface IError extends Error{
    statusCode: string,
    error_message: string
}