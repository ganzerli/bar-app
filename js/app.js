// instanciatincg classes
const ui = new UI(); /*it creates elements for the ui*/
const drinksApi = new DrinksApi();
const drinksDB = new DrinksDB();
// Event listeness
function eventListeners() {
  // add eventt listeners when submit
  const form = document.querySelector("#search-drinks-form");
  if (form) {
    // for pages without form
    form.addEventListener("submit", getDrinks);
  }

  // delegation for the event listeners
  const resultContainer = document.getElementById("result");
  if (resultContainer) {
    // to add the event listeners also to the buttons, that are not in the DOM at the pageload
    resultContainer.addEventListener("click", delegationForButtons);
  }
  // event listener for the popup
  const popup = document.querySelector("#popup-details");
  if (popup) {
    popup.addEventListener("click", popupListener);
  }
}

eventListeners();

// get Drinks function
function getDrinks(e) {
  e.preventDefault();
  // clear the result
  const result = document.querySelector("#result");
  result.innerHTML = "";
  const drinkToSearch = document.querySelector("#drinks-input").value;
  const requestType = document.querySelector("#drinks-input").name;

  if (drinkToSearch === "") {
    // call UI print message
    ui.printMessage(
      "nothing to search please fill text in the form",
      "field-invalid"
    );
  } else {
    let promise;
    // making global query-function to return the response for every case.
    switch (requestType) {
      // taking the right obkect from the right API querying the right route
      case "search-by-alcoholic":
        console.log(requestType);
        promise = drinksApi.getDrinksAlcoholic(false);
        break;
      case "search-by-ingredients":
        console.log(requestType);
        promise = drinksApi.getDrinksByIngedients(drinkToSearch);
        break;
      case "search-by-category":
        console.log(requestType);
        promise = drinksApi.getDrinksByCategory(false);
        break;
      case "search-by-name":
        console.log(requestType);
        promise = drinksApi.getDrinksByName(drinkToSearch);
        break;

      default:
        promise = null;
    }
    /**
     * THIS FUNCTIION CALLS THE RIGHT API ROUTE AND RETURNS THE PROMISE BACK;
     * THE UI TAKES THE REQUEST TYPE AND HAS A SWITCH TO DECIDE WHICH TEMPLATE TO USE
     */

    // with the resp object the ui class can display the elements
    if (promise) {
      promise.then(res => {
        if (res.drinks === null) {
          // if the object returned is null
          ui.printMessage(`no matches for: ${drinkToSearch}`);
        } else {
          //display ingredients, res.drinks is the object with the array
          console.log(res.drinks);
          //ui has methods that create and add load the new elements
          ui.respArrayToHtml(res.drinks, requestType);
        }
      });
    } else {
      ui.printMessage(
        `REQUEST TYPE NOT RECOGNIZED IN app.js 33 ${requestType}`
      );
    }
  } //end else form invalid
}

// delegation for the result area
function delegationForButtons(e) {
  e.preventDefault();
  if (e.target.classList.contains("open-modal")) {
    getIdDrinkDetails(e.target.id);
  } else {
    console.log("clicked somewhere else");
  }
}

// query the api and get the details in the result div
function getIdDrinkDetails(id) {
  // query the api
  drinksApi.getDrinkById(id).then(res => {
    //taking the response object
    const AllDetails = { ...res.drinks[0] };
    ui.showDetails(AllDetails);
  });
}

/// popup listener delegation
function popupListener(e) {
  e.preventDefault();
  //when clicking check where is been clicked
  if (e.target.classList.contains("popup-content")) {
    console.log("clicked on content");
  } else {
    // close modal
    console.log("clicked on the body o the modal");
    e.target.classList.remove("popup-active");
  }
  console.log(e);
}
