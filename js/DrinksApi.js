// methods to return as json fro the apy
class DrinksApi {
  async getDrinksByName(name) {
    //search by nmae
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    const drinks = await apiResponse.json();
    return { ...drinks };
  }
}
