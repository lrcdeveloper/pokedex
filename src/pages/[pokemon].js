import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@styles/PokemonDetalle.module.css';
import { getPokemonIsInPokedex } from '@services/getPokemonIsInPokedex';
import { setTotalPokedex } from '../actions';
import { useDispatch } from 'react-redux';

const Pokemon = () => {

  const dispatch = useDispatch();
  const router = useRouter()
  const { pokemon } = router.query;
  const [ pokemonData, setPokemonData ] = useState(null);
  const [ pokemonIsInPokedex, setPokemonIsInPokedex ] = useState(null);

  useEffect(() => {
    getPokemonData();
    if(pokemon){
      setPokemonIsInPokedex(getPokemonIsInPokedex(pokemon));
    }
  },[pokemon])

  const getPokemonData = async () => {
    if(pokemon) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`,{
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        getDataAndTypesAndMoves(data)
    }
  }

  const getDataAndTypesAndMoves = (pokemon) => {
    const types = [];
    pokemon.types.forEach((dato) => {
      types.push(dato.type.name);
    });

    const moves = [];
    const lastFiveMoves = pokemon.moves.slice(-5);
    lastFiveMoves.forEach((dato) => {
      moves.push(dato.move.name);
    });

    const pokemonDetails = {
      'name': pokemon.name,
      'image': pokemon.sprites.other.dream_world.front_default,
      'types': types,
      'moves': moves,
    };
    setPokemonData(pokemonDetails);
  }

  const addPokemonToMyPokedex = (pokemon) => {
    setPokemonIsInPokedex(true);
    let pokedexStorage = JSON.parse(localStorage.getItem('pokedex'));
    let pokedexItems = [];
    if(pokedexStorage) {
      pokedexItems = JSON.parse(localStorage.getItem('pokedex'));      
      pokedexItems.push(pokemon);
      localStorage.setItem('pokedex', JSON.stringify(pokedexItems));
      dispatch(setTotalPokedex(pokedexItems.length));
    } else {
      localStorage.setItem('pokedex', JSON.stringify([pokemon]));
      dispatch(setTotalPokedex(1));
    }
  };

  const removePokemonFromMyPokedex = (pokemon) => {
    setPokemonIsInPokedex(false);
    let pokedexStorage = JSON.parse(localStorage.getItem('pokedex'));
    let pokedexItems = [];
    if(pokedexStorage) {
      pokedexItems = JSON.parse(localStorage.getItem('pokedex'));
      const indexOf = pokedexItems.findIndex(item => {
        return item === pokemon;
      });
      pokedexItems.splice(indexOf, 1);
      localStorage.setItem('pokedex', JSON.stringify(pokedexItems));
      dispatch(setTotalPokedex(pokedexItems.length));
    }
  };

return (
    <div className={styles.detalleContainer}>
    <Container component="main" maxWidth="md">
    <Grid container spacing={2}>
      { 
                  pokemonData &&
      <>
        <Grid item xs={12} sm={5} md={5} className={styles.boxImage}>
            <Image 
            width={900}
            height={900}
            src={pokemonData.image} 
            alt="portada" 
            className="portada"
          />

      </Grid>
      <Grid item xs={12} sm={7} md={7} className={styles.boxDetails}>
      <Container  maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={10} className={styles.boxName}>
              <span className={styles.name}>{pokemonData.name}</span>
          </Grid>
          <Grid item xs={12} sm={12} md={2} className={styles.boxAddFavorites}>
            {
              pokemonIsInPokedex ?
              
                <i className="fa-solid fa-star" onClick={()=>{removePokemonFromMyPokedex(pokemonData.name)}}></i>
              :
                <i className="fa-regular fa-star" onClick={()=>{addPokemonToMyPokedex(pokemonData.name)}}></i>              
            }
          </Grid>
        </Grid>
          <Grid container spacing={2} className={styles.boxTypes}>
          <Grid item xs={12} sm={12} md={12} className={styles.flexStart}>
              <span>Types: </span> 
            </Grid>
              {
                pokemonData.types.map((type, index) => 
                  <Grid item xs={6} sm={4} md={4} key={index}>
                      <div className={styles.boxType}> 
                        {type}
                      </div>
                  </Grid>
                )
              }
          </Grid>
          <Grid container spacing={2} className={styles.boxMoves}>
            <Grid item xs={12} sm={12} md={12} className={styles.flexStart}>
              <span>Moves: </span> 
            </Grid>
              {
                pokemonData.moves.map((move, index) => 
                <Grid item xs={6} sm={4} md={4} key={index}>
                <div className={styles.boxMove}> 
                  {move}
                  
                </div>
            </Grid>
                )
              }
          </Grid>
          </Container>
        </Grid>
        </>
      }
      </Grid>
  </Container>
</div>
  );
};

export default Pokemon;
