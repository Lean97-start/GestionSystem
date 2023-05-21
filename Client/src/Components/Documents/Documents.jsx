import React from "react";
import style from './Documents.module.css'

function Documents(props){
    return (
        <main className={style.DocumentsList}>
            <h1>CUERPO</h1>
            <table id={style.tableDocuments}>
                <tr>
                    <th>Hoy</th>
                    <th>Mañana</th>
                    <th>Martes</th>
                </tr>
                <tr>
                    <td>Soleado</td>
                    <td>Mayormente soleado</td>
                    <td>Parcialmente nublado</td>
                </tr>
            </table>
        </main>
    )
}

export default Documents;