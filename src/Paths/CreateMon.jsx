import availableSpecies from "../../public/availableSpecies.json";
import availableNatures from "../../public/availableNatures.json";
const CreateMon = () => {
  return (
    <>
      <h1>Add a new member!</h1>
      <p>Add a new member to your team!</p>
      <form>
        <label htmlFor="species">Species: </label>
        <select name="species" id="species" required>
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
        <input type="text" id="nickname" />
        <fieldset>
          <legend>Select the Pokémon's nature:</legend>
          {availableNatures.map((nature) => (
            <div key={nature}>
              <input
                type="radio"
                name="nature"
                id={nature}
                value={nature}
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
