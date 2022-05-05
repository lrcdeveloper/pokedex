import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from '@styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { setTotalPokedex } from '../actions';
import { useDispatch } from 'react-redux';
import PokedexCounter from '@components/PokedexCounter';
import pokebola from '../assets/pokebola.png';

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let pokedexStorage = JSON.parse(localStorage.getItem('pokedex'));
    let totalPokemons = 0;
    if (pokedexStorage) {
      const pokemons = JSON.parse(localStorage.getItem('pokedex'));
      totalPokemons = pokemons.length;
    }
    dispatch(setTotalPokedex(totalPokemons));
  });

  return (
    <div className={styles.headerContainer}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link href="/" passHref>
              <h1 className={styles.title}>Pokemons</h1>
            </Link>
          </Grid>
          <Grid item xs={6} className={styles.pokedexLink}>
            <Link href="/myPokedex" passHref>
              <div className={styles.pokedexLinkBtn}>
                <Image width={36} height={36} src={pokebola} />
                <PokedexCounter />
              </div>
            </Link>
          </Grid>
          <Grid item xs={2} className={styles.pokedexLink}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
