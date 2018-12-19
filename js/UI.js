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
    <div class="api-res-drink-content">
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
<div class="api-res-drink-content">
  <figure class="api-res-figure">
    <img
      src="${drinkObject.strDrinkThumb}"
      class="api-res-img"
      alt="${drinkObject.strDrink}"
    />
  </figure>
  <h3 class="api-res-name">${drinkObject.strDrink}</h3>
  <button class='open-modal' id='${drinkObject.idDrink}' >Open details</button>
  <span class="api-res-extrainfo">${drinkObject.strAlcoholic}</span>
  <span class="api-res-extrainfo">${drinkObject.strCategory}</span>
</div>
    `;
    return div;
    // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE // TEMPLATE
  }

  showDetails(detailsObject) {
    console.log(detailsObject);
    const result = document.querySelector("#result");
    // clear result and make a template for the new one..
    result.innerHTML = "";

    // loop throught the keys of the object
    for (let key in detailsObject) {
      // check if the data is ok
      if (detailsObject.hasOwnProperty(key)) {
        if (detailsObject[key] !== "" && detailsObject[key] !== null) {
          const div = document.createElement("div");
          div.innerHTML = detailsObject[key];
          result.classList.remove("api-res-wrapper");
          result.appendChild(div);
          console.log(detailsObject[key]);
        } else {
        }
      }
    }
  }
} // end class
