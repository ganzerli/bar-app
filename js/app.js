// instanciatincg classes
const ui = new UI(); /*it creates elements for the ui*/
const drinksApi = new DrinksApi();
const drinksDB = new DrinksDB();
// Event listeness
function eventListeners() {
  //document ready
  document.addEventListener("DOMContentLoaded", DOMReady);
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
        promise = drinksApi.getDrinksAlcoholic(
          document.querySelector("#drinks-input").checked
        );
        break;
      case "search-by-ingredients":
        console.log(requestType);
        promise = drinksApi.getDrinksByIngedients(drinkToSearch);
        break;
      case "search-by-category":
        console.log(requestType);
        promise = drinksApi.getDrinksByCategory(drinkToSearch);
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
  } else if (e.target.classList.contains("button-comment")) {
    comment(e.target);
  }
}
function comment(element) {
  const parent = element.parentElement;
  const textarea = parent.querySelector(".textarea-comment");

  // check inf the textarea is active the button saves the comment
  if (parent.querySelector(".textarea-comment-active")) {
    // take the comment from the commetn html
    const comment = parent.querySelector(".api-res-extrainfo").innerHTML || "";
    //set as text of the comment in the paragraph
    parent.querySelector(".api-res-extrainfo").innerHTML = textarea.value;
    //get the id
    const id = element.getAttribute("drinkid");
    // save new comment

    drinksDB.comment(id, textarea.value);

    // close the textarea
    textarea.classList.remove("textarea-comment-active");

    console.log("done pressed");
  } else {
    // it opens the comment
    textarea.classList.add("textarea-comment-active");
    element.innerHTML = "done!";
    console.log(element, textarea);
    // modify display textarea
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

/// popup listener delegation to close poppup and save
function popupListener(e) {
  e.preventDefault();
  //when clicking check where is been clicked
  if (e.target.classList.contains("popup-content")) {
    // if clicked on the content the popup stays
  } else if (e.target.classList.contains("save-drink")) {
    // clicking the button the object get saved
    if (e.target.classList.contains("button-saved")) {
      //remove the class
      e.target.classList.remove("button-saved");
      //and remove from favourites
      drinksDB.remonveFromDb(e.target.name);

      console.log("REMOVE" + e.target.name);
    } else {
      e.target.classList.add("button-saved");
      console.log("SAVE" + e.target.name);
      //get info from html element
      const parentElement = e.target.parentElement;
      //get attributes of element , prepare the name as the api works
      const name = parentElement
        .getAttribute("name")
        .split(" ")
        .join("_");
      const image = parentElement.getAttribute("image");
      //set info
      const drinkInfo = {
        id: e.target.name, //name attribute of the button is the id of the drink
        name: name,
        img: image,
        comment: ""
      };
      console.log("saving" + drinkInfo);
      drinksDB.saveInDb(drinkInfo);
    }
  } else {
    // clicking ouside the modal closes
    e.target.classList.remove("popup-active");
  }
}

function DOMReady() {
  if (document.querySelector("#main-favourites-reference")) {
    ui.loadFavourites();
    // add event listener for button comment
  } else {
    // or the ui calssgives problems if in other pages
    ui.populateForm();
  }
}
