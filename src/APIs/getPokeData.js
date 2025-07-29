const getPokeData = async (id) => {
    try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!pokemonResponse.ok) {
            throw new Error(`Error fetching PokeData: HTML error. Status: ${pokemonResponse.status}`)
        }
        const pokemonData = await pokemonResponse.json();
        const sprite = pokemonData.sprites.front_default;

        const speciesResponse = await fetch(pokemonData.species.url)
        if (!speciesResponse.ok) {
           throw new Error(`Error fetching PokeData: HTML error. Status: ${speciesResponse.status}`) 
        }
        const speciesData = await speciesResponse.json();
        console.log(speciesData)
        let description;
        for (let i = 0; i < speciesData.flavor_text_entries.length; i++) {
            if (speciesData.flavor_text_entries[i].language.name == "en") {
                description = speciesData.flavor_text_entries[i].flavor_text;
                break;
            }
        }

        return {description, sprite}
    } catch (error) {
        console.error("Error fetching PokeData: ", error)
        return { description: null, sprite: null }
    }
} 

export default getPokeData;