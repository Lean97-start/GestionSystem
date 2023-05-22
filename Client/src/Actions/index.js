import axios from 'axios';

export const GET_DOCUMENTS = 'GET_DOCUMENTS',
    GET_DOCUMENT = 'GET_DOCUMENT',
    SHOW_DIALOG = 'SHOW_DIALOG'

export function getDocuments(){
    return (dispatch) => {
        return axios.post('http://localhost:3320/V1/document/getAllDocuments')
            .then((response) => dispatch({type: GET_DOCUMENTS, payload: response}))
            .catch(e => console.log(e))
    }
}

export function getDocument(_id_document){
    return (dispatch) => {
        return axios.get(`http://localhost:3320/V1/document/getDocument/${_id_document}`)
            .then((response) => dispatch({type: GET_DOCUMENT, payload: response}))
            .catch(e => console.log(e))
    }
}

export function showDialog(valueShow){
    return {type: SHOW_DIALOG, payload: valueShow}
}

