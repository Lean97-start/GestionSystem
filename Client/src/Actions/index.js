import axios from 'axios';

export const GET_DOCUMENTS = 'GET_DOCUMENTS'

export function getDocuments(){
    return (dispatch) => {
        return axios.get('')
            .then((response) => dispatch({type: GET_DOCUMENTS, payload: response}))
            .catch(e => console.log(e))
    }
}