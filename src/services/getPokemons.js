

import { getPokemonIsInPokedex } from "@services/getPokemonIsInPokedex";

export const getPokemons = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const detallePokemonsData = await Promise.all(
          data.results.map(async (pokemon)=> {
            const response = await fetch(pokemon.url);
            return response.json();
          })
        )
        const pokemonsData = [];
        for (const pokemon of detallePokemonsData) {
            const moves = [];
            const fistMove =  pokemon.moves[0].move.name;
            const lastMove =  pokemon.moves[pokemon.moves.length - 1].move.name;
            moves.push(fistMove, lastMove);
            const pokemonDetails = {
                'name': pokemon.name,
                'image': pokemon.sprites.other.dream_world.front_default,
                'firstType': pokemon.types[0].type.name,
                'moves': moves,
                'isInPokedex': getPokemonIsInPokedex(pokemon.name)
            }
            pokemonsData.push(pokemonDetails);
        }
        return {
            'pokemons': pokemonsData,
            'apiData': {            
                'nextUrl': data.next,
                'previousUrl': data.previous
            }
        };
    } catch (error) {
        return null;
    }
}