const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    || pokeDetail.sprites.front_default
    || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'; // fallback imagem

 
  pokemon.height = pokeDetail.height; 
  pokemon.weight = pokeDetail.weight;

  pokemon.abilities = pokeDetail.abilities.map(
    abilitySlot => abilitySlot.ability.name
  );

  pokemon.stats = pokeDetail.stats.map(statSlot => ({
    name: statSlot.stat.name,
    value: statSlot.base_stat,
  }));

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonsDetails => pokemonsDetails)
    .catch(error => {
      console.error('Erro ao carregar os pokémons:', error);
      alert('Houve um erro ao carregar os Pokémons. Tente novamente mais tarde.');
      return []; 
    });
}
