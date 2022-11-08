
import { Link } from 'react-router-dom';
import React from 'react'
import style from "../componets/LandingPage.module.css";

export default function LandingPage() {

    return (
        <div className={style.landingPage}>
            <div className={style.containText}>
                <h1 className={style.landingText}>Bienvenidos a POKEMONS</h1>
                <Link to="/home">
                    <button className={style.btn}>Ingresar</button>
                </Link>
            </div>
        </div >

    );

}
