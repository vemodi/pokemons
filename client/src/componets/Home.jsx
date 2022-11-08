import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getPokemons,
    orderByName,
    filterCreated,
    getTypes,
    filterByTypes,
    orderByAttack,
    // getNamePokemon,



} from '../redux/actions'
import { Link } from 'react-router-dom'
import Card from "./Card"
import SearchBar from "./SearchBar"
import Paginado from "../componets/Paginado"
import style from './Home.module.css'
import LinkTitle from "./Card.module.css";


export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.pokeTypes)


    const [currentPage, setCurrentPage] = useState(1); //creamos un stado local para setear la paginacion o pagina actual
    const [pokemonsPerPage,] = useState(12); //creamos un stado local para setear la cantidad de pokemons por pagina
    const indexOfLastPokemon = currentPage * pokemonsPerPage; //mis pokemons por pagina
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //aqui restamos la cantidad de pokemons por pagina y me da 0


    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)// creamos un estado local para setear los pokemons de la pagina actual

    const paginado = (pageNumber) => {
        // me ayuda al renderizado del paginado
        setCurrentPage(pageNumber);
    };



    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getPokemons())
    }
    const [, setOrder] = useState('')
    function handleOrderByName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }

    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value))
    }
    const [, setAttack] = useState('')
    function handleOrderByAttack(e) {
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setAttack(`ordenado ${e.target.value}`)
    }
    // function handleClickPrev(e) {
    //     e.preventDefault()
    //     if (currentPage > 1) { //
    //         setCurrentPage(currentPage - 1) // restamos uno a la pagina actual
    //     }
    // }
    // function handleClickNext(e) {
    //     e.preventDefault()
    //     if (currentPage < Math.ceil(allPokemons.length / pokemonsPerPage)) { // math.ceil me da la cantidad de paginas que necesito
    //         setCurrentPage(currentPage + 1) // sumamos uno a la pagina actual
    //     } else if (allPokemons === 0) {
    //         setCurrentPage(1)
    //     }

    // }

    return (
        <div>
            <div className={style.container}>
                <div>
                    <div className={style.navbar} >
                        <Link to="/create">
                            <button className={style.allPokemons}>Crear Pokemon</button>
                        </Link>

                        <button className={style.allPokemons} onClick={(e) => handleClick(e)}> Volver a cargar los Pokemons </button>
                        <div className={style.contentSelect}>
                            <select onClick={(e) => handleOrderByName(e)}>
                                <option >Ordenar de la A - Z</option>
                                <option value="asc" >Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                            <div>
                                <select onClick={(e) => handleOrderByAttack(e)}>

                                    <option value="asc"   >Attack Ascendente</option>
                                    <option value="desc"> Attack Descendente</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.contentSelect} >
                            <select className='filterType' onChange={e => handleFilterType(e)}>
                                <option key={0} value="all">Type Filter...</option>
                                {
                                    allTypes?.map(pt => {
                                        return <option value={pt.name} key={pt.id}>{pt.name}</option>
                                    })
                                }
                            </select>

                        </div>

                        <div className={style.contentSelect}>
                            <select onChange={(e) => handleFilterCreated(e)}>
                                <option value="" hidden>Filtrar creados </option>
                                <option value="all">Todos </option>
                                <option value="created">Creados</option>

                            </select>
                        </div>
                        <div>
                            <SearchBar />


                        </div>


                    </div>
                    <div >

                    </div>
                    <div className={style.mainCard}>

                        {
                            currentPokemons.length > 0 ?

                                currentPokemons.map(p => {

                                    return (
                                        <div key={p.id}>
                                            <Link to={"/detail/" + p.id} className={LinkTitle.linkTitle}>
                                                <Card
                                                    key={p.id}
                                                    img={p.img}
                                                    name={p.name}
                                                    attack={p.attack}
                                                    types={p.types} />
                                            </Link>
                                        </div>
                                    )
                                }) :
                                <h1 className={style.noImage}>Informacion no disponible</h1>


                        }
                    </div>
                    <Paginado

                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        paginado={paginado}

                    // prev={(e) => handleClickPrev(e)}
                    // next={(e) => handleClickNext(e)}
                    />
                </div>

            </div>
        </div >


    )
}