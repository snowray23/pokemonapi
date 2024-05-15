// Utilize JavaScript asynchronous functions to fetch data from the PokeAPI and dynamically update the webpage content based on user input.
//Develop a details page that displays comprehensive information about a specific Pokémon, including its abilities, types, stats, and image

document.addEventListener('DOMContentLoaded', function() {

   
    async function fetchPokemonData(pokemonName) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was an error', error);
        }
    }

    
    function displayPokemonDetails(pokemon) {
        const pokemonDetails = document.getElementById('pokemonDetails');
        pokemonDetails.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <h3>Abilities:</h3>
            <ul>
                ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
            </ul>
            <h3>Types:</h3>
            <ul>
                ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
            </ul>
            
        `;
    }

   
    const searchForm = document.getElementById('searchForm');
    if (searchForm) { 
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
            const pokemonData = await fetchPokemonData(pokemonName);
            if (pokemonData) {
                displayPokemonDetails(pokemonData);
            }
        });
    }
});