import { SET_POKEMON } from './type';
import { SET_TOTAL } from './type';

export const setPokemon = (payload) => ({
    type: SET_POKEMON,
    payload
});

export const setTotalPokedex = (payload) => ({
    type: SET_TOTAL,
    payload
});
