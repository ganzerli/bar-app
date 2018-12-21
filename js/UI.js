// everything in the prokect
class UI {
  // display a custom message
  printMessage(message, cl = null) {
    const div = document.createElement("div");
    if (cl) {
      document.getElementById("drinks-input").classList.add(cl);
    }
    div.innerHTML = `
      <div class="alert">
        <button type="button" class="close-alert" data-dismiss="alert">close</button>
        <p>${message}</p>
      </div>
      `;

    // insert before , reference and
    const reference = document.querySelector("#submit-button");
    const parentNode = reference.parentElement;
    parentNode.insertBefore(div, reference);

    setTimeout(() => {
      if (cl) {
        document.getElementById("drinks-input").classList.remove(cl);
      }
      parentNode.removeChild(div);
    }, 3000);
  }

  respArrayToHtml(respArray, requestType) {
    // to have a different template if the response is different
    const result = document.querySelector("#result");
    switch (requestType) {
      case "search-by-name":
        respArray.forEach(drink => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementName(drink);
          result.appendChild(element);
        });
        break;
      case "search-by-ingredients":
        respArray.forEach(drink => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementImgTitile(drink);
          result.appendChild(element);
        });
        break;
      case "search-by-alcoholic":
        respArray.forEach(drink => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementImgTitile(drink);
          result.appendChild(element);
        });
        break;
      case "search-by-category":
        respArray.forEach(drink => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementImgTitile(drink);
          result.appendChild(element);
        });
        break;
      default:
        console.log("NO FEATURES IN UI.JS");
    }
    /*
    respArray.forEach(drink => {
      const element = this.wrapElementName(drink);
      result.appendChild(element);
    }); */
  }

  // functions for single template
  wrapElementName(drinkObject) {
    const fillList = drinkObject => {
      // make an array to store the pars
      let arr = [];
      for (let i = 1; i < 16; i++) {
        //making an obkect to store the 2 values
        if (drinkObject[`strIngredient${i}`] !== "") {
          let ingredientQuantity = {};
          ingredientQuantity.ingredient = drinkObject[`strIngredient${i}`];
          ingredientQuantity.quantity = drinkObject[`strMeasure${i}`];
          arr.push(ingredientQuantity);
        }
      }

      let listHtml = "";
      arr.forEach(iq => {
        listHtml += `
          <li class="api-res-list-element"><span>${
            iq.ingredient
          }</span>-<span>${iq.quantity}</span></li>
          `;
      });

      return listHtml;
    };

    let div = document.createElement("div");
    div.classList.add("api-res-drink-element");
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE

    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
    div.innerHTML = `
    <div class="api-res-drink-content"   name="${
      drinkObject.strDrink
    }" image="${drinkObject.strDrinkThumb}"  >
    <h3 class="api-res-name">${drinkObject.strDrink}</h3>
    <figure class="api-res-figure">
      <img
        src="${drinkObject.strDrinkThumb}"
        class="api-res-img"
        alt="${drinkObject.strDrink}"
      />
    </figure>
    <h4 class="api-res-instructions-title">INSTRUCITONLS</h4>
    <p class="api-res-instructions-text">
      all the instructions: ${drinkObject.strInstructions}
    </p>
    <ul class="api-res-list">
      <li class="api-res-list-element api-res-list-title">INGREDIENTS</li>
      <li class="api-res-list-element api-res-list-title">${fillList(
        drinkObject
      )}</li>
    </ul>
    <button class='save-drink ${this.favouriteClassCheck(
      drinkObject.idDrink,
      "button-saved"
    )}' name='${drinkObject.idDrink}' >${
      this.favouriteClassCheck(drinkObject.idDrink, "button-saved")
        ? "REMOVE"
        : "SAVE"
    }</button>
    <p class="api-res-info">EXTRA INFORMATION:</p>
    <span class="api-res-extrainfo">${drinkObject.strAlcoholic}</span>
    <span class="api-res-extrainfo">${drinkObject.strCategory}</span>
  </div>
    `;
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
    return div;
  }

  wrapElementImgTitile(drinkObject) {
    let div = document.createElement("div");
    div.classList.add("api-res-drink-element");
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
    div.innerHTML = `
<div class="api-res-drink-content" name="${drinkObject.strDrink}" image="${
      drinkObject.strDrinkThumb
    }" >
  <figure class="api-res-figure">
    <img
      src="${drinkObject.strDrinkThumb}"
      class="api-res-img"
      alt="${drinkObject.strDrink}"
    />
  </figure>
  <h3 class="api-res-name">${drinkObject.strDrink}</h3>
  <button class='open-modal' id='${drinkObject.idDrink}' >Open details</button>
  <button class='save-drink ${this.favouriteClassCheck(
    drinkObject.idDrink,
    "button-saved"
  )}' name='${drinkObject.idDrink}' >${
      this.favouriteClassCheck(drinkObject.idDrink, "button-saved")
        ? "REMOVE"
        : "SAVE"
    }</button>
  <span class="api-res-extrainfo">${drinkObject.strAlcoholic}</span>
  <span class="api-res-extrainfo">${drinkObject.strCategory}</span>
</div>
    `;
    return div;
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
  }

  showDetails(detailsObject) {
    console.log(detailsObject);
    //clear popup
    const popup = document.querySelector("#popup-details");
    popup.innerHTML = "";
    // make popup template
    this.popupTemplate(popup, detailsObject);
    popup.classList.add("popup-active");
  }

  popupTemplate(popup, detailsObject) {
    const fillList = drinkObject => {
      // make an array to store the pars
      let arr = [];
      for (let i = 1; i < 16; i++) {
        //making an obkect to store the 2 values
        if (drinkObject[`strIngredient${i}`] !== "") {
          let ingredientQuantity = {};
          ingredientQuantity.ingredient = drinkObject[`strIngredient${i}`];
          ingredientQuantity.quantity = drinkObject[`strMeasure${i}`];
          arr.push(ingredientQuantity);
        }
      }

      let listHtml = "";
      arr.forEach(iq => {
        listHtml += `
          <li class="api-res-list-element"><span>${
            iq.ingredient
          }</span>-<span>${iq.quantity}</span></li>
          `;
      });

      return listHtml;
    };
    this.favouriteClassCheck(detailsObject.idDrink);
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
    popup.innerHTML = `
  
    <div class="popup-content" id="popup-info" name="${
      detailsObject.strDrink
    }" image="${detailsObject.strDrinkThumb}" >
  <h3 class="api-res-name">${detailsObject.strDrink}</h3>
  <figure class="popup-figure">
    <img
      src="${detailsObject.strDrinkThumb}"
      class="popup-img"
      alt="${detailsObject.strDrink}"
    />
  </figure>
  <h4 class="api-res-instructions-title">${detailsObject.strGlass}</h4>
  <h4 class="api-res-instructions-title">INSTRUCITONLS</h4>
  <p class="api-res-instructions-text">
    all the instructions: ${detailsObject.strInstructions}
  </p>
  <ul class="api-res-list">
    <li class="api-res-list-element api-res-list-title">INGREDIENTS</li>
    <li class="api-res-list-element api-res-list-title">
      ${fillList(detailsObject)}
    </li>
  </ul>
  <button class='save-drink ${this.favouriteClassCheck(
    detailsObject.idDrink,
    "button-saved"
  )}' name='${detailsObject.idDrink}' >${
      this.favouriteClassCheck(detailsObject.idDrink, "button-saved")
        ? "REMOVE"
        : "SAVE"
    }</button>
  <p class="api-res-info">EXTRA INFORMATION:</p>
  <span class="api-res-extrainfo">${detailsObject.strAlcoholic}</span>
  <span class="api-res-extrainfo">${detailsObject.strCategory}</span>
</div>
    
    
    

    
    `;
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
  }

  // populate the form
  populateForm() {
    const name = document.querySelector("#drinks-input").name;
    if (name === "search-by-category") {
      //query the api to give to the form the categories
      drinksApi.getCategoryList().then(res => {
        //taking the array from the resp
        const categoriesArr = [...res.drinks];
        //looping throught the array and get the category
        categoriesArr.forEach(category => {
          const element = category.strCategory;

          // creating the new elements for the form
          makeOptions(element);
        });
      });
    } else if (name === "search-by-ingredients") {
      //query the api to give to the form the categories
      drinksApi.getIngredientsList().then(res => {
        //taking the array from the resp
        const ingredientsArr = [...res.drinks];
        //looping throught the array and get the category
        ingredientsArr.forEach((ingredient, index) => {
          const element = ingredient.strIngredient1;
          // creating the new elements for the form
          makeOptions(element);
        });
      });
    } else {
      //default
    }
    const makeOptions = element => {
      const option = document.createElement("option");
      option.textContent = element;
      //for the value to use for queriing the db we need _ instead of space
      option.value = element.split(" ").join("_");

      document.querySelector("#drinks-input").appendChild(option);
    };
  }

  // return the class facourite if there is or ""
  favouriteClassCheck(toCheck, classToAdd) {
    const favourites = drinksDB.getFromDB();
    // loop throught the array
    for (let i in favourites) {
      if (favourites[i].id === toCheck) {
        return classToAdd;
      }
    }
    return false;
  }

  //load favourites
  loadFavourites() {
    ///////////////////////////////////////////////////////////TEMPLATE
    const favTemplate = drinkObj => {
      return `
      <div class="api-res-drink-content">
      <figure class="api-res-figure">
        <img src="${drinkObj.img}" class="api-res-img" alt="${
        drinkObj.strDrink
      }"/>
      </figure>
      <h3 class="api-res-name">${drinkObj.name}</h3>
      <button class="open-modal" id="${drinkObj.id}">Open details</button>
      <button class="button-comment" drinkid="${
        drinkObj.id
      }">comment</button> <br/>
      <textarea class="textarea-comment" rows="1" cols="10">${
        drinkObj.comment
      }</textarea> 
      <p class="api-res-extrainfo">${drinkObj.comment}</p>
    </div>
       `;
    };
    ////////////////////////////////////////////////////////////
    const drinks = drinksDB.getFromDB();
    console.log(drinks);
    //watch which object has the id same, record the object or index, and remove

    // loop throught the array
    for (let i in drinks) {
      //if the id of the nth object math
      const child = document.createElement("div");
      child.classList.add("api-res-drink-element");
      child.innerHTML = favTemplate(drinks[i]);
      console.log(drinks[i]);
      document.querySelector("#result").appendChild(child);
    }
  }
} // end class
