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

  respArrayToHtml(respArray) {
    const result = document.querySelector("#result");
    respArray.forEach(drink => {
      const element = this.wrapElement(drink);
      result.appendChild(element);
    });
  }

  wrapElement(drinkObject) {
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
      console.log(arr);
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
}
