import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getDocument, showDialog } from '../../Actions';
import style from './DocumentDetail.module.css';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function DocumentDetail(props){
    let docLoad = false;
    let show = props.showValue;

    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const textNoHAYDESCR = "No tiene descripción"
    const textNoTIENEGRUPO = "No tiene grupo de usuarios"

    if(props.document){
        docLoad = props.document.document;
    }
    const showDialog = () => {
        props.showDialog()
        show = false;
    }

    return(
        <div className="card flex justify-content-center">
            <Dialog header="Detalle de documento" visible={show} style={{ width: '50vw' }} onHide={() => showDialog()}>                                  
                {docLoad && 
                    <div id={style.divCardDoc}>
                        <p id={style.title}><a href='' id={style.title}>{docLoad.nameDocument}</a></p>
                        <p id={style.labelData}>Fecha de carga: </p><p id={style.date}>{docLoad.createdAt.split('T')[0]}</p>
                        <br />
                        <p id={style.labelData}>Propietario del documento: </p><p id={style.owner}>{docLoad.documentOwner}</p>
                        <br />
                        <p id={style.labelDescription}>Descripcion:</p>
                        <p id={style.description}>{!docLoad.descriptionDocument? textNoHAYDESCR : docLoad.descriptionDocument}</p>
                        <p id={style.labelData}>Grupo de usuarios:</p>
                        <p id={style.groupUsers}>{!docLoad.usersGroup? textNoTIENEGRUPO: docLoad.usersGroup}</p>
                    </div>}
            </Dialog>  
        </div>      
    )
}

export const mapStateToProps = (state) => {
    return { 
        document: state.document,
        showValue: state.showValue
    }
}

export const mapDispatchToProps = (dispatch) => {
    return { 
        getDocument: (_id_doc) =>  dispatch(getDocument(_id_doc)),
        showDialog: () => dispatch(showDialog(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);