export interface IDocument{
    nameDocument: string,
    typeDocument: 'publico'| "privado" | "borrador",
    documentOwner: string
    dataDocument: string
}

export interface ISuccess{
    statusCode: number,
    message: string
}

export interface IFilterDocument{
    nameDocument?: string,
    documentOwner?: string,
    createdAt?: Date
}