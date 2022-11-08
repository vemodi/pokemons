import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemon } from "../redux/actions";
import style from './Home.module.css';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNamePokemon(name));
    }

    return (
        <div>
            <input
                className={style.inputBuscar}
                type="text"
                placeholder="Buscar"
                value={name}
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={style.btnBuscar} >Buscar</button>




        </div >
    )
}
