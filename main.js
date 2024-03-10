const pokemonContainer = document.querySelector(".pokedex-container");
// console.log(pokemonContainer);

const search = document.querySelector(".search");
// console.log(search);

const searchButton = document.querySelector(".search-button");
// console.log(searchButton);

const searchInput = document.querySelector(".search-input");
// console.log(searchInput);

const pokemonCount = 151;

const backgroundColor = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

searchButton.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".pokemon-name");

  pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.parentElement.style.display = "block";

    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "none";
    }
  });
});

const fetchPokemons = async () => {
  for (let i = 1; i < pokemonCount; i += 1) {
    await getPokemons(i);
  }
};

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonID = pokemon.id.toString().padStart(3, "0");

  const pokemonType = pokemon.types[0].type.name;

  const pokemonBackgroundColor = backgroundColor[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBackgroundColor}`;

  const { id, name, base_experience, weight } = pokemon;

  const pokemonDivContent = `<div class="image-container">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
  />
</div>
<div class="pokemon-info">
  <span class="pokemon-id">#${pokemonID}</span>
  <h3 class="pokemon-name">${name}</h3>
  <div class="small">
    <small class="pokemon-exp">
      <i class="fa-solid fa-flask"></i>${base_experience}exp
    </small>
    <small class="pokemon-weight">
        <i class="fa-solid fa-flask"></i>${weight}kg
    </small>
  </div>
  <div class="pokemon-type">
    <i class="fa-brands fa-uncharted"></i>${pokemonType}
  </div>
</div>`;

  pokemonDiv.innerHTML = pokemonDivContent;

  pokemonContainer.appendChild(pokemonDiv);
};

fetchPokemons();
