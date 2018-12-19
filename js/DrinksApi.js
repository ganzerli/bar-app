// methods to return as json fro the apy
class DrinksApi {
  // fetch asyncronous request to the API BY NAME
  async getDrinksByName(name) {
    //it queries the api and returns an object
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    const drinks = await apiResponse.json();
    return { ...drinks };
  }
  // fetch asyncronous request to the API by ingredients
  async getDrinksByIngedients(ingredient) {
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    const drinks = await apiResponse.json();

    return { ...drinks };
  }

  // fetch asyncronous request to the API if alcoholic or not
  async getDrinksAlcoholic(isAlcoholic) {
    let apiResponse;
    if (isAlcoholic) {
      apiResponse = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
      );
    } else {
      apiResponse = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
      );
    }
    const drinks = await apiResponse.json();
    return { ...drinks };
  }

  // fetch asyncronous request to the API for CATEGORY
  async getDrinksByCategory(value) {
    //load ORDINARY DRINK
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`
    );

    //making the object for the response from the resp array of the API
    const drinks = await apiResponse.json();
    return { ...drinks };
  }

  async getDrinkById(id) {
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const details = await apiResponse.json();
    return { ...details };
  }
  // get list of caategory
  async getCategoryList() {
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
    );
    const categories = await apiResponse.json();
    return { ...categories };
  }
  // get list of ingredients
  async getIngredientsList() {
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`
    );
    const ingredients = await apiResponse.json();
    return { ...ingredients };
  }
}
