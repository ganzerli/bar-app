// clases annd methods of DDB is here

class DrinksDB {
  //testd works

  saveInDb(drink) {
    //taking the array already in the local storage
    const drinks = this.getFromDB();
    //push in the array given from getFromDb
    drinks.push(drink);
    //overwrite the local storage with new array
    localStorage.setItem("drinks", JSON.stringify(drinks));
  }
  remonveFromDb(id) {
    //take the array
    const drinks = this.getFromDB();
    //watch which object has the id same, record the object or index, and remove

    // loop throught the array
    for (let i in drinks) {
      //if the id of the nth object math
      if (drinks[i].id === id) {
        console.log("ok");
        //cut out value from array
        drinks.splice(i, 1);
      }
    }
    //insert new array in local storage
    localStorage.setItem("drinks", JSON.stringify(drinks));
    console.log("REMOVED " + id);
    console.log(this.getFromDB());

    //save new array in db
  }
  getFromDB() {
    let drinks;
    // check for local storage
    if (localStorage.getItem("drinks") === null) {
      //if nothing it returns an empty array
      drinks = [];
    } else {
      //or the array of objects in local storage
      drinks = JSON.parse(localStorage.getItem("drinks"));
    }
    //always returns an array

    return drinks;
  }
}
