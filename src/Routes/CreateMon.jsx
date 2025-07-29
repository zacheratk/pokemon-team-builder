import { useState } from "react";
import availableSpecies from "../Data/availableSpecies.json";
import availableNatures from "../Data/availableNatures.json";
import getPokeData from "../APIs/getPokeData";
import { supabase } from "../APIs/supabaseClient";

const CreateMon = () => {
  const [formOptions, setFormOptions] = useState({
    nickname: "",
    species: "",
    pokedex_number: 0,
    nature: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    if (name === "species") {
      const speciesObj = availableSpecies.find(
        (species) => species.id === parseInt(value)
      );
      setFormOptions((prev) => ({
        ...prev,
        species: speciesObj.name,
        pokedex_number: speciesObj.id,
      }));
    } else {
      setFormOptions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formOptions);
    const { description, sprite } = await getPokeData(
      formOptions.pokedex_number
    );

    await supabase
      .from("Pokemon")
      .insert({
        nickname: formOptions.nickname,
        species: formOptions.species,
        pokedex_number: formOptions.pokedex_number,
        nature: formOptions.nature,
        description: description,
        sprite: sprite,
      })
      .select();

    // window.location = "/gallery";
  };

  return (
    <>
      <h1>Add a new member!</h1>
      <p>Add a new member to your team!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="species">Species: </label>
        <select
          name="species"
          id="species"
          value={formOptions.species}
          onChange={handleChange}
          required
        >
          <option disabled hidden selected value="">
            Select species...
          </option>
          {availableSpecies.map((species) => (
            <option key={species.id} value={species.id}>
              {species.name}
            </option>
          ))}
        </select>
        <label htmlFor="nickname">Nickname: </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={formOptions.nickname}
          onChange={handleChange}
        />
        <fieldset>
          <legend>Select the Pokémon's nature:</legend>
          {availableNatures.map((nature) => (
            <div key={nature}>
              <input
                type="radio"
                name="nature"
                id={nature}
                value={nature}
                checked={formOptions.nature === nature}
                onChange={handleChange}
                required
              />
              <label htmlFor={nature}>{nature}</label>
              <br />
            </div>
          ))}
        </fieldset>
        <button type="submit">Create party member!</button>
      </form>
    </>
  );
};

export default CreateMon;
