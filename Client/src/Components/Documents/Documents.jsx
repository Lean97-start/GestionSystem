import React, { useEffect, useState } from "react";
import style from './Documents.module.css';
import { connect } from "react-redux";
import {getDocument, getDocuments, showDialog} from '../../Actions/index';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import DocumentDetail from "./DocumentDetail";
function Documents(props){
    
    useEffect(() => { props.getDocuments()}, []);

    const dialogDoc = (id_doc) => {
        console.log(id_doc)
        props.getDocument(id_doc);
        props.showDialog()
    }

    return (
        <main className={style.DocumentsList}>
            <table id={style.tableDocuments}>
                <tr>
                    <th>Nombre documento</th>
                    <th>Fecha de carga</th>
                    <th>Tipo de documento</th>
                    <th>Propietario</th>
                    <th>Documento</th>
                    <th>Ver</th>
                    <th>Descargar</th>
                </tr>
                {props.documents && props.documents.documents.map((
                    {_id,
                    nameDocument,
                    createdAt,
                    typeDocument,
                    documentOwner,
                    dataDocument})=>
                    (
                        <tr key={_id}>
                            <td>{nameDocument}</td>
                            <td>{createdAt.split('T')[0]}</td>
                            <td>{typeDocument}</td>
                            <td>{documentOwner}</td>
                            <td>{dataDocument}</td>
                            <td><Button label="VER" icon="pi pi-external-link" onClick={() => dialogDoc(_id)}/></td>
                            <td><button>DESCARGAR</button></td>
                        </tr>
                    ))
                }
            </table>
            {props.showValue && <DocumentDetail/>}
        </main>
    )
}

export const mapStateToProps = (state) => {
    return { 
        documents: state.documents,
        document: state.document,
        showValue: state.showValue
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getDocuments: () =>  dispatch(getDocuments()),
        getDocument: (_id_document) => dispatch(getDocument(_id_document)),
        showDialog: () => dispatch(showDialog(true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);