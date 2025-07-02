const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151
const limit = 8;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <div class="card-inner">
          <div class="front">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join(" ")}
              </ol>
              <img
                src="${pokemon.photo}"
                alt="${pokemon.name}"
              />
            </div>
          </div>

          <div class="back">
            <div class="extra-info">
              <p><strong>Altura:</strong> ${(pokemon.height / 10).toFixed(1)} m</p>
              <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
              <p><strong>Stats:</strong></p>
              <ul>
                ${pokemon.stats
                  .map((stat) => `<li>${stat.name}: ${stat.value}</li>`)
                  .join("")}
              </ul>
            </div>
          </div>
        </div>
      </li>
    `
      )
      .join("");
    pokemonList.innerHTML += newHtml;

    const cards = document.querySelectorAll(".pokemon");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.toggle("active");
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})