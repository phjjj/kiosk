const drink = db.collection("음료");

drink.get().then((result) => {
  result.forEach((doc) => {
    console.log(doc.data());
    var drinkList = `<div class="list-food">
          <img src="../../img/drink.png" />
          <div class="text-foodInfo">
            <div class="text-foodName">${doc.data().name}</div>
            <div class="text-foodPrice">${doc.data().price}원</div>
          </div>
        </div>`;
    $(".box-left").append(drinkList);
  });
});
