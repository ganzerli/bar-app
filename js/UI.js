// everything in the prokect
class UI {
  // display a custom message
  printMessage(message, cl = null) {
    const div = document.createElement("div");
    if (cl) {
      document.getElementById("drinks-input").classList.add(cl);
    }
    div.innerHTML = `
      <div class="form-invalid">
        <p>${message}</p>
      </div>
      `;

    // insert before , reference and
    const reference = document.querySelector(".form-group");
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
        respArray.forEach((drink, index) => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementName(drink);
          element.style.animationDelay = `${index * 70}ms`;
          result.appendChild(element);
        });
        break;
      case "search-by-ingredients":
        respArray.forEach((drink, index) => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementImgTitile(drink);
          element.style.animationDelay = `${index * 70}ms`;
          result.appendChild(element);
        });
        break;
      case "search-by-alcoholic":
        respArray.forEach((drink, index) => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementImgTitile(drink);
          element.style.animationDelay = `${index * 70}ms`;
          result.appendChild(element);
        });
        break;
      case "search-by-category":
        respArray.forEach((drink, index) => {
          //creates a div with the info in the response array from app.js
          const element = this.wrapElementImgTitile(drink);
          element.style.animationDelay = `${index * 70}ms`;
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
          <li class="api-res-list-element"><span class="ingredient">${
            iq.ingredient
          }</span>&nbsp; - &nbsp;<span class="quantity">${
          iq.quantity
        }</span></li>
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
    <div>
    <h3 class="api-res-name">${drinkObject.strDrink}</h3>
    <figure class="api-res-figure">
      <img
        src="${drinkObject.strDrinkThumb}"
        class="api-res-img"
        alt="${drinkObject.strDrink}"
      />
    </figure>
    </div>
    <h4 class="api-res-instructions-title">INSTRUCITONS</h4>
    <p class="api-res-instructions-text">
       ${drinkObject.strInstructions}
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
        ? "REMOVE <i class='fas fa-eraser api-res-icon api-res-icon-delete'></i>"
        : "SAVE <i class='far fa-save api-res-icon api-res-icon api-res-icon-save'></i>"
    }</button>
    
    <p class="api-res-info"></p>
    <div class="api-res-wrap">  
        <span class="api-res-extrainfo api-res-extrainfo-left">${
          drinkObject.strAlcoholic
        }</span>
        <span class="api-res-extrainfo api-res-extrainfo-right">${
          drinkObject.strCategory
        }</span>
      </div>
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
  <button class='open-modal' id='${
    drinkObject.idDrink
  }' >Details <i class="fas fa-mortar-pestle api-res-icon api-res-icon-details"></i></button>
  <button class='save-drink ${this.favouriteClassCheck(
    drinkObject.idDrink,
    "button-saved"
  )}' name='${drinkObject.idDrink}' >${
      this.favouriteClassCheck(drinkObject.idDrink, "button-saved")
        ? "REMOVE <i class='fas fa-eraser api-res-iconEapi-res-icon-delete'></i>"
        : "SAVE <i class='far fa-save api-res-icon api-res-icon api-res-icon-save'></i>"
    }</button>
 <br/>
</div>
    `;
    return div;
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
  }

  showDetails(detailsObject) {
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
          }</span class="ingrdient">&nbsp;  &nbsp; <span class="quantity">${
          iq.quantity
        }</span></li>
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
  <h4 class="api-res-instructions-title">INSTRUCITONS</h4>
  <p class="api-res-instructions-text">
    ${detailsObject.strInstructions}
  </p>
  <ul class="api-res-list">
    <li class="api-res-list-element api-res-list-title">INGREDIENTS</li>
    <li class="api-res-list-element ">
      ${fillList(detailsObject)}
    </li>
  </ul>
  <button class='save-drink ${this.favouriteClassCheck(
    detailsObject.idDrink,
    "button-saved"
  )}' name='${detailsObject.idDrink}' >${
      this.favouriteClassCheck(detailsObject.idDrink, "button-saved")
        ? "REMOVE <i class='fas fa-eraser api-res-icon api-res-icon-delete'></i>"
        : "SAVE <i class='far fa-save api-res-icon api-res-icon api-res-icon-save'></i>"
    }</button>

    <p class="api-res-info"></p>
    <div class="api-res-wrap">  
        <span class="api-res-extrainfo api-res-extrainfo-left">${
          detailsObject.strAlcoholic
        }</span>
        <span class="api-res-extrainfo api-res-extrainfo-right">${
          detailsObject.strCategory
        }</span>
      </div>
</div>
    
    
    

    
    `;
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
  }

  // populate the form
  populateForm() {
    const name = document.querySelector("#drinks-input").name || "";
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
      <button class="open-modal" id="${
        drinkObj.id
      }">Details <i class="fas fa-mortar-pestle api-res-icon api-res-icon-details"></i></button>
      <button class="button-comment" drinkid="${
        drinkObj.id
      }">Comment <i class='fas fa-pencil-alt api-res-icon api-res-icon-comment'></i></button> <br/>
      <textarea class="textarea-comment" rows="1">${
        drinkObj.comment
      }</textarea> 
      <p class="api-res-extrainfo-comment">${drinkObj.comment}</p>
    </div>
       `;
    };
    ////////////////////////////////////////////////////////////
    const drinks = drinksDB.getFromDB();
    //watch which object has the id same, record the object or index, and remove

    // loop throught the array and create an element for each object with the template
    for (let i in drinks) {
      //if the id of the nth object match
      const child = document.createElement("div");
      child.classList.add("api-res-drink-element");
      child.innerHTML = favTemplate(drinks[i]);
      // adding the animation delay for the elements
      child.style.animationDelay = `${i * 70}ms`;
      document.querySelector("#result").appendChild(child);
    }
  }
} // end class
