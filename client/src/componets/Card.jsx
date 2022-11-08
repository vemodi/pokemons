import React from 'react';

import style from "./Card.module.css";

export default function Card({ img, name, types, attack }) {
    return (

        <div className={style.mainContainer}>
            <div className={style.card}>

                <h4 className={style.linkTitle}> {name.charAt(0).toUpperCase() +
                    name.slice(1)}
                </h4>

                <img className={style.img} src={img} alt={`${name}`} width="175px" height="160px" />

                <h5 className={style.linkTitle}>
                    {types && types.map((type, index) => (
                        <p key={index} value={type.name} className={style.linkTitleTypes} >{type.name}</p>
                    ))}
                </h5>
                <h6 className={style.attack}>Attack:  {attack}</h6>
                <br />
            </div>
        </div>
    )
}