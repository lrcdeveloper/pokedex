
export const getPokemonIsInPokedex = (pokemon) => {
    let pokedexStorage = JSON.parse(localStorage.getItem('pokedex'));
      let pokedexItems = [];
      if(pokedexStorage) {
        pokedexItems = JSON.parse(localStorage.getItem('pokedex'));
        const isInPodkedex = pokedexItems.find(item => item === pokemon);
        if(isInPodkedex){
            return true;
        } else {
            return false;
        }
      } else {
        return false
    }
}