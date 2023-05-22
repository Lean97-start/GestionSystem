import  React  from "react";
import style from "../Navbar/Navbar.module.css";

function Navbar(props){
    return(
        <nav className={style.Navbar}>
            <img id={style.logoCrowdar} src="https://crowdar.com.ar/images/logo-crowdar.png" alt="Logo Crowdar"></img>
        </nav>
    )
}

export default Navbar;