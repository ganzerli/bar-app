// instanciatincg classes
const ui = new UI();
const drinksApi = new DrinksApi();
const drinksDB = new DrinksDB();
// Event listeness
function eventListenesr() {
  // add eventt listeners when submit
  const form = document.querySelector("#search-drinks-form");
  if (form) {
    // for pages without form
    form.addEventListener("submit", getDrinks);
  }
}

eventListenesr();

// get Drinks function
function getDrinks(e) {
  e.preventDefault();

  const drinkToSearch = document.querySelector("#drinks-input").value;
  if (drinkToSearch === "") {
    // call UI print message
    ui.printMessage(
      "nothing to search please fill text in the form",
      "field-invalid"
    );
  } else {
    // if the promise is resolved, response from api all good then
    drinksApi.getDrinksByName(drinkToSearch).then(res => {
      if (res.drinks === null) {
        ui.printMessage(`no matches for: ${drinkToSearch}`);
      } else {
        //sisplay ingredients, res. drinks is the object with the array
        console.log(res.drinks);
        ui.respArrayToHtml(res.drinks);
      }
    });
  }
}
