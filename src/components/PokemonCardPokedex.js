import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import styles from '@styles/PokemonCard.module.css';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image';
import Link from 'next/link';

import { setTotalPokedex } from '../actions';
import { useDispatch } from 'react-redux';

const PokemonCard = ({ pokemon, pokedexChange = null }) => {
  const dispatch = useDispatch();
  const [pokemonIsInPokedex, setPokemonIsInPokedex] = useState(false);
  useEffect(() => {
    setPokemonIsInPokedex(pokemon.isInPokedex);
  }, [pokemon]);

  const addPokemonToMyPokedex = (pokemon) => {
    setPokemonIsInPokedex(true);
    let pokedexStorage = JSON.parse(localStorage.getItem('pokedex'));
    let pokedexItems = [];
    if (pokedexStorage) {
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
    if (pokedexStorage) {
      pokedexItems = JSON.parse(localStorage.getItem('pokedex'));
      const indexOf = pokedexItems.findIndex((item) => {
        return item === pokemon;
      });
      pokedexItems.splice(indexOf, 1);
      localStorage.setItem('pokedex', JSON.stringify(pokedexItems));
      dispatch(setTotalPokedex(pokedexItems.length));

      if (pokedexChange) {
        pokedexChange();
      }
    }
  };

  return (
    <Grid item xs={6} sm={6} md={6}>
      <Card>
        <CardActionArea className={styles.card}>
          <Grid item xs={12} className={styles.displayLeft + ' ' + styles.favoritesBtn}>
            {pokemonIsInPokedex ? (
              <i
                className="fa-solid fa-star"
                onClick={() => {
                  removePokemonFromMyPokedex(pokemon.name);
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-star"
                onClick={() => {
                  addPokemonToMyPokedex(pokemon.name);
                }}
              ></i>
            )}
          </Grid>
          <Link href={`/${pokemon.name}`} passHref>
            <div>
              <div className={styles.borderBottom}>
                <Image width={500} height={500} src={pokemon.image} alt="portada" className={styles.portada} />
                <h2 className={styles.itemName}>{pokemon.name}</h2>
              </div>
              <div className={styles.boxTypes}>
                <Grid item xs={12} sm={12} md={12}>
                  <div>{pokemon.firstType}</div>
                </Grid>
              </div>
              <div className={styles.boxMoves}>
                <Grid container spacing={2}>
                  {pokemon.moves.map((move, index) => (
                    <Grid key={index} item xs={6} sm={6} md={6}>
                      <div>{move}</div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
