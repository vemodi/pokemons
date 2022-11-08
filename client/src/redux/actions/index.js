import axios from 'axios';
import {
    GET_POKEMONS,
    GET_NAME_POKEMON,
    ORDER_BY_NAME,
    FILTER_CREATED,
    GET_TYPES,
    FILTER_BY_TYPES,
    ORDER_BY_ATTACK,
    GET_DETAIL,
    RESET_DETAIL
} from './types';

export function getPokemons() {
    return async (dispatch) => {
        try {
            let pokemons = await axios.get("http://localhost:3001/pokemons")
            return dispatch({
                type: GET_POKEMONS,
                payload: pokemons.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getNamePokemon(name) {
    return async (dispatch) => {
        try {
            let pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
                type: GET_NAME_POKEMON,
                payload: pokemon.data
            })

        } catch (err) {
            console.log(err)
            alert("No se encuentra el nomre")

        }
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload

    }
}

export function getTypes() {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function filterByTypes(payload) {
    console.log(payload)
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}
export function orderByAttack(payload) {
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        })

    }
}
export function postPokemon(payload) {
    return async function (dispatch) {
        const json = await axios.post("http://localhost:3001/pokemons/create", payload)
        return json

    }
}

export function reset_detail() {
    return {
        type: RESET_DETAIL
    }
}

