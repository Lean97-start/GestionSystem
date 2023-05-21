import React from "react"
import Navbar from "../Navbar/Navbar";
import style from "./Home.module.css";
import Documents from "../Documents/Documents";
import TabFilter from "../TabFilter/TabFilter";

function Home(props){
    
    return(
        <div className={style.HomeGral}>
            <Navbar id={style.Navbar}/>
            <div id={style.bodyGrid2}>
                <TabFilter id={style.TabFilter}/>
                <Documents id={style.Documents}/>
            </div>
        </div>
    )
}

export default Home;