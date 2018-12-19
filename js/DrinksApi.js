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
  async getDrinksAlcoholic(isAlcoholic = true) {
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
  async getDrinksByCategory(category = true) {
    let apiResponse;
    if (category) {
      //load ORDINARY DRINK
      apiResponse = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`
      );
    } else {
      //load COCKTAIL
      apiResponse = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`
      );
    }
    //making the object for the response from the resp array of the API
    const drinks = await apiResponse.json();
    return { ...drinks };
  }
}
