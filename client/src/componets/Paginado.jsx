import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, next, prev }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        //math.ceil redondea todos las recetas sobre todas las recetas que tengo por  pagina
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav>

                <ul className={style.ul}>
                    {/* <button onClick={prev}>Prev</button> */}
                    {pageNumbers &&
                        pageNumbers.map((number) => (

                            <li key={number}>
                                <a onClick={() => paginado(number)}>{number}</a>
                            </li>

                        ))}
                    {/* <button onClick={next}> Next</button> */}
                </ul>

            </nav>
        </div >
    );
}


