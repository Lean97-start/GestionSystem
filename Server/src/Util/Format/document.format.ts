
export const formatResponse = (doc: any) => {
    return {
        _id: doc._id,
        nameDocument: doc.nameDocument,
        descriptionDocument: doc.descriptionDocument,
        typeDocument: doc.typeDocument,
        documentOwner: doc.documentOwner,
        usersGroup: doc.usersGroup
    }
}