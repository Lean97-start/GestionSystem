import {
    GET_DOCUMENTS,
    GET_DOCUMENT,
    SHOW_DIALOG
} from '../Actions/index';

const initialValues = {
    documents: [],
    document: {},
    users: [],
    user: {},
    showValue: false
}

const rootReducer = (state = initialValues, {type, payload}) => {
    switch(type){
        case GET_DOCUMENTS:
            return {...state, documents: payload.data}

        case GET_DOCUMENT:
            return {...state, document: payload.data}

        case SHOW_DIALOG:
            return {...state, showValue: payload}

        default: return "Null" 
    }
}

export default rootReducer;