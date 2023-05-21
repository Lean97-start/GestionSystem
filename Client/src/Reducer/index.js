import {
    GET_DOCUMENTS
} from '../Actions';

const initialValues = {
    documents: [],
    document: {},
    users: [],
    user: {}
}

const rootReducer = (state = initialValues, {type, payload}) => {
    switch(type){
        case GET_DOCUMENTS:
            return {...state, documents: payload.data}
        default: return "Null" 
    }
}

export default rootReducer;