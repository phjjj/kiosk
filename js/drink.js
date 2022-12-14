const drink = db.collection("음료");
const shoppingBasket = document.querySelector(".list-shoppingbasket");
const storageItems = JSON.parse(localStorage.getItem("foods"));
const total = document.querySelector(".text-total");
const age = localStorage.getItem("age");
const clearBtn = document.querySelector(".btn-cancel");

clearBtn.addEventListener("click", clearAll);
let shoppingBasketsArr = [];

if (storageItems) {
  storageItems.forEach((e) => {
    addToFood(e);
    shoppingBasketsArr.push(e);
  });
}

drink.get().then((result) => {
  result.forEach((doc) => {
    const drinkList = `<button class="list-food">
          <img src="../../img/drink.png" />
          <div class="text-foodInfo">
            <div class="text-foodName">${doc.data().name}</div>
            <div class="text-foodPrice">${doc.data().price}원</div>
          </div>
        </button>`;
    $(".box-left").append(drinkList);
  });
  const listFood = document.querySelectorAll(".list-food");

  for (let i = 0; i < listFood.length; i++) {
    listFood[i].addEventListener("click", handleClick);

    function handleClick() {
      const name = document.getElementsByClassName("text-foodName");
      const price = document.getElementsByClassName("text-foodPrice");

      const newFood = {
        id: Date.now(),
        name: name[i].innerText,
        price: price[i].innerText,
      };
      shoppingBasketsArr.push(newFood);
      localStorage.setItem("foods", JSON.stringify(shoppingBasketsArr));
      addToFood(newFood);
    }
  }
});

function addToFood(newFood) {
  const newOrder = document.createElement("div");
  newOrder.setAttribute("class", "list-order");
  newOrder.setAttribute("id", `${newFood.id}`);

  const newFoodName = document.createElement("span");
  newFoodName.setAttribute("class", "text-newFoodName");
  newFoodName.innerText = `${newFood.name}`;

  const newFoodPrice = document.createElement("span");
  newFoodPrice.setAttribute("class", "text-newFoodPrice");
  newFoodPrice.innerText = `${newFood.price}`;
  totalToPrice(newFoodPrice);

  const button = document.createElement("button");
  button.setAttribute("class", "btn-delete fa-solid fa-x");
  button.addEventListener("click", (e) => {
    deleteHandler(newOrder, e);
  });

  newOrder.append(newFoodName);
  newOrder.append(newFoodPrice);
  newOrder.append(button);
  shoppingBasket.append(newOrder);
  console.log(total);
}

function deleteHandler(newOrder, e) {
  let targetId = e.target.parentElement.id;
  removePrice = parseInt(e.target.previousElementSibling.innerText);
  total.innerText = parseInt(total.innerText) - removePrice;
  shoppingBasket.removeChild(newOrder);

  // console.log(removePrice);

  shoppingBasketsArr = shoppingBasketsArr.filter(
    (shoppingBaskets) => shoppingBaskets.id !== parseInt(targetId)
  );
  // console.log(shoppingBasketsArr);
  localStorage.setItem("foods", JSON.stringify(shoppingBasketsArr));
}

function totalToPrice(newFoodPrice) {
  sumPrice = parseInt(newFoodPrice.innerText);

  total.innerText = sumPrice + parseInt(total.innerText);
}

function clearAll() {
  while (shoppingBasket.hasChildNodes()) {
    shoppingBasket.removeChild(shoppingBasket.firstChild);
  }
  shoppingBasketsArr.length = 0;

  localStorage.setItem("foods", JSON.stringify(shoppingBasketsArr));

  total.innerText = 0;
}
