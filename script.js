function loadData() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log('Pokemon not found', error)
        })
}

loadData();

fetch('https://pokeapi.co/api/v2/pokemon')
    .then(function(response) {
        if (response.status != 200) {
            console.log('Error: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            const pokemons = data.results;
            pokemons.forEach(pokemon => {
                document.getElementById('pokemonList')
                    .insertAdjacentHTML('beforeend', `<li onclick='detail("${pokemon.url}")'>${pokemon.name}</li>`);
            });
        });
    })
    .catch(function(error) {
        console.log(error);
    });

function detail(url) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(pokemon) {
            document.getElementById('detail').innerHTML = `
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Weight: ${pokemon.weight}kg</p>
                <p>Height: ${pokemon.height}m</p>
            `;
        })
        .catch(function(error) {
            console.log(error);
        });
}
