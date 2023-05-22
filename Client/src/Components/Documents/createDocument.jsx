import React from "react";
// import { FileUpload } from 'primereact/fileupload';
import style from './CreateDocument.module.css';

function CreateDocument(props){


    return(
        <form id={style.CreateDocument}>
            <h1 id={style.titleCreate}>Crear documento</h1>
            {/* Agregar documento */}

                <label id={style.titleCreate} >Seleccionar archivo:</label>
                <br />
                <input id={style.titleCreate} type="file" name="archivo" />

            {/* Filtro de tipo de documento */}
            <p id={style.titleCreate}>Seleccionar tipo de documento:</p>
            <select id={style.titleCreate} name='filterTypeDoc' placeholder='Seleccionar Tipo'>
                <option id={style.titleCreate} value="withoutValue" selected>Sin Filtro</option>
                <option value="private">Privado</option>
                <option value="public">Público</option>
                <option value="draft">Borrador</option>
            </select>

            {/* Seleccionar propietario */}
            <p id={style.titleCreate}>Seleccionar propietario:</p>
            <select id={style.titleCreate} name='filterTypeDoc' placeholder='Seleccionar propietario'>
                <option id={style.titleCreate} value="private">Privado</option>
                <option id={style.titleCreate} value="public">Público</option>
            </select>

            <br />
            {/* Campo de descripción */}
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <br />
            <button>Crear</button>
        </form>
    );
}



export const mapStateToProps = (state) => {
    return { 
        document: state.document,
        showValue: state.showValue
    }
}

export const mapDispatchToProps = (dispatch) => {
    return { 
    }
}

export default CreateDocument;