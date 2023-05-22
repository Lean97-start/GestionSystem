import React, { useState } from 'react';
import style from './TabFilter.module.css';
import { getDocuments } from '../../Actions';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 
import { Calendar } from 'primereact/calendar';

function TabFilter(props){

    let [state, setState] = useState({
        typeDocument: "",
        nameDocument: "",
        createdAt: ""
    })
    const typeDocument = [
        { name: 'Todos', code: 'all' },
        { name: 'Privado', code: 'privado' },
        { name: 'Público', code: 'publico' },
        { name: 'Borrador', code: 'borrador' }
    ]

    const handleChange = (e) => {
        if (e.target.value.name) {
            setState({...state, [e.target.name]: e.target.value.code});
        }else {
            setState({...state, [e.target.name]: e.target.value});
        }
    }
    
    const filterSubmit = (e) => {
        e.preventDefault();
        for (const filter in state) {
            // eslint-disable-next-line eqeqeq
            if(state[filter] == ""){
                state = delete state.filter;
            }
        }
        console.log(state)
        getDocuments(state);
    }

    return(
        <form onSubmit={() => {}} className={style.TabFilter}>
            <h1>TabNav</h1>

            <label>Tipo de documento</label>
            <br/>
            <Dropdown id={style.dropdown} name='typeDocument' value={state.typeDocument} onChange={
                (e) => handleChange(e)
            } options={typeDocument} optionLabel="name" 
            placeholder="Tipo de documento..." className="w-full md:w-14rem" />
            {/* <select name='filterTypeDoc' placeholder='Seleccionar Tipo'>
                <option value="withoutValue" selected>Sin Filtro</option>
                <option value="private">Privado</option>
                <option value="public">Público</option>
                <option value="draft">Borrador</option>
            </select> */}
            <br/>
            <label>Nombre del documento</label>
            <br/>
            <div  className="card flex justify-content-center">
                <InputText id={style.inputNameDoc} name='nameDocument' value={state.documentOwner} type="text" placeholder="Nomb. documento" onChange={(e) => handleChange(e)}/>
            </div>
            <br />
            <label>Fecha de carga</label>
            <br/>
            <div className="card flex justify-content-center">
                <Calendar id={style.dateLoad} name='createdAt' value={state.createdAt} onChange={(e) => handleChange(e)} />
            </div>
            <br />        
            <Button type='submit' label="Filtrar" severity="info" onClick={(e) => filterSubmit(e)}/>
        </form>
    )
}
export const mapDispatchToProps = (dispatch) => {
    return { getDocuments: (filters) =>  dispatch(getDocuments(filters))}
}

export default connect(undefined, mapDispatchToProps)(TabFilter);