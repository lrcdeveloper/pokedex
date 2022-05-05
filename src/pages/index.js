import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from '@styles/Home.module.css';
import { getPokemons } from '@services/getPokemons';
import PokemonCard from '@components/PokemonCard';

function Home() {

  const [ pokemonsData, setPokemonsData ] = useState([]);
  const [ nextUrl, setNextUrl ] = useState(null);
  const [ previousUrl, setPreviousUrl ] = useState(null);

  useEffect(() =>{
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    getPokemonsData(initialUrl);
  }, [])

  const getPokemonsData = async (url) => {
      const data = await getPokemons(url);
      setPokemonsData(data.pokemons);
      setPreviousUrl(data.apiData.previousUrl);
      setNextUrl(data.apiData.nextUrl);
  }


  return (
    <div className={styles.homeContainer}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            { 
              pokemonsData && pokemonsData.length > 0 &&
              pokemonsData.map((pokemon, index) => 
                <PokemonCard pokemon={pokemon} key={index}/>
              )
            }
          </Grid>
          <Grid container spacing={3}>
                <Grid item xs={12} className={styles.boxPagination}>
                  {
                    previousUrl &&
                      <button onClick={()=>{getPokemonsData(previousUrl)}} className={styles.previousBtn}>previous</button>
                  }
                  {
                    nextUrl &&
                      <button onClick={()=>{getPokemonsData(nextUrl)}} className={styles.nextBtn}>Next</button>
                  }
                </Grid>                    
            </Grid>
        </Container>
    </div>
  );
}


export default Home;