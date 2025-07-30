import { useEffect, useState } from "react";
import { getDataById } from "../APIs/getSupabaseData";
import { supabase } from "../APIs/supabaseClient";
import getPokeData from "../APIs/getPokeData";
import availableSpecies from "../Data/availableSpecies.json";
import availableNatures from "../Data/availableNatures.json";
import { useParams } from "react-router-dom";

const EditMon = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [formOptions, setFormOptions] = useState({
    nickname: "",
    species: "",
    pokedex_number: 0,
    nature: "",
  });

  useEffect(() => {
    setIsLoading(true);
    getDataById(id)
      .then((data) => {
        setFormOptions({
          nickname: data.nickname,
          species: data.species,
          pokedex_number: data.pokedex_number,
          nature: data.nature,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    const { description, sprite } = await getPokeData(
      formOptions.pokedex_number
    );

    const nickname =
      formOptions.nickname === "" ? formOptions.species : formOptions.nickname;

    await supabase
      .from("Pokemon")
      .update({
        nickname: nickname,
        species: formOptions.species,
        pokedex_number: formOptions.pokedex_number,
        nature: formOptions.nature,
        sprite: sprite,
        description: description,
      })
      .eq("id", id);

    window.location = "/gallery";
  };

  return (
    <>
      <h1>Edit Member</h1>
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="species">Species: </label>
          <select
            name="species"
            id="species"
            value={formOptions.pokedex_number}
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
      )}
    </>
  );
};

export default EditMon;
