const tteokBokkiData = db.collection("떡볶이");

tteokBokkiData.get().then((result) => {
  result.forEach((doc) => {
    const name = doc.data().name;
    const price = doc.data().price;
    const tteokBokkiList = `<button class="list-food">
          <img src="../../img/dduck.png" />
          <div class="text-foodInfo" >
            <div class="text-foodName">${name}</div>
            <div class="text-foodPrice">${price}원</div>
          </div>
        </button>`;
    $(".box-left").append(tteokBokkiList);
  });

  const listFood = document.querySelectorAll(".list-food");

  for (let i = 0; i < listFood.length; i++) {
    listFood[i].addEventListener("click", function (event) {
      const name = document.getElementsByClassName("text-foodName");
      const price = document.getElementsByClassName("text-foodPrice");
      const orderList = `<div class="list-order">
            <span >${name[i].innerText}</span>
            <button class="btn-minus" onclick='count("minus")'>
              <i  class="fa-solid fa-minus"></i>
            </button>
            <div id="num-count">0</div>
            <button class="btn-plus"onclick='count("plus")'>
              <i  class="fa-solid fa-plus"></i>
            </button>
            <span>${price[i].innerText}</span>
          </div>`;

      $(".list-shoppingbasket").append(orderList);
      // const listOrder = document.querySelectorAll(".list-order");
      // for (let i = 0; i < listOrder.length; i++) {
      //   listOrder[i].addEventListener("click", function (event) {
      //     const numCount = document.getElementById("num-count");
      //     let number = numCount.innerText;
          
      //   });
      // }
    });
  }
});

const numCount = document.getElementById("num-count");
function count(type) {
  // 결과를 표시할 element
  
  const numCount = document.getElementById("num-count");
  // 현재 화면에 표시된 값

  let number = numCount.innerText;

  // 더하기/빼기
  if (type === "plus") {
    number = parseInt(number) + 1;
  } else if (type === "minus" && number !== "0") {
    number = parseInt(number) - 1;
  }

  // 결과 출력
  numCount.innerText = number;
}
