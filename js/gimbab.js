const gimbab = db.collection("김밥");

gimbab.get().then((result) => {
  result.forEach((doc) => {
    console.log(doc.data());
    var gimbabList = `<div class="list-food">
          <img src="../../img/gimbab.png" />
          <div class="text-foodInfo">
            <div class="text-foodName">${doc.data().name}</div>
            <div class="text-foodPrice">${doc.data().price}원</div>
          </div>
        </div>`;
    $(".box-left").append(gimbabList);
  });
  const listFood = document.querySelectorAll(".list-food");

  for (let i = 0; i < listFood.length; i++) {
    listFood[i].addEventListener("click", function (event) {
      const name = document.getElementsByClassName("text-foodName");
      const price = document.getElementsByClassName("text-foodPrice");
      const orderList = `<div class="list-order">
            <span >${name[i].innerText}</span>
            
            </button>
            <span>${price[i].innerText}</span>
          </div>`;

      $(".list-shoppingbasket").append(orderList);
    });
  }
});
