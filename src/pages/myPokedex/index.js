import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from '@styles/Pokedex.module.css';
import PokedexLayout from '@layout/PokedexLayout';
import PokemonCardPokedex from '@components/PokemonCardPokedex';


const MyPokedex = () => {

    const [ pokemonsData, setPokemonsData ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ totalPages, setTotalPages ] = useState(0);

  useEffect(() => {
    getMyPokedex(1);
  }, []);

  const getMyPokedex = (currentPage = 1) => {
      let pokedexStorage = JSON.parse(localStorage.getItem('pokedex'));
      let pokedexItems = [];
      if(pokedexStorage) {
        const pokemons = JSON.parse(localStorage.getItem('pokedex'));
        paginatePokemons(pokemons, 2, currentPage);
        setCurrentPage(currentPage);
        setTotalPages(pokemons.length / 2);
      }
  }

  const paginatePokemons = (array, pageSize, pageNumber) => {
    const pokemonsToRender = array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    getPokemonsData(pokemonsToRender);
  }

  const getPokemonsData = async (pokemons) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    const data = await response.json();
    const detallePokemonsData = await Promise.all(
      pokemons.map(async (pokemon)=> {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
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
            'isInPokedex': true
        }
        pokemonsData.push(pokemonDetails);
    }
    setPokemonsData(pokemonsData)
  }

  const previousPage = () => {  
    if(currentPage > 1) {
      const previousPage = currentPage - 1;
      getMyPokedex(previousPage);
    }
  }

  const nextPage = () => {
    if(currentPage < totalPages) {
      const nextPage = currentPage + 1;
      getMyPokedex(nextPage);
    }
  }

    return (
        <Container maxWidth="md" className={styles.pokedexContainer}>                
                <Grid container spacing={3}>
                    <Grid item xs={12} className={styles.title}>My Pokedex</Grid>
                    { 
                    pokemonsData && pokemonsData.length > 0 &&
                      pokemonsData.map((pokemon, index) => 
                          <PokemonCardPokedex pokemon={pokemon} key={index} pokedexChange={getMyPokedex}/>
                      )
                    }
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={styles.boxPagination}>
                      <button onClick={previousPage} className={styles.previousBtn}>previous</button>
                      <button onClick={nextPage} className={styles.nextBtn}>Next</button>
                    </Grid>                    
                </Grid>
        </Container>
        );
    };

export default MyPokedex;

MyPokedex.Layout = PokedexLayout;
