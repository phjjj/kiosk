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
            
            </button>
            <span>${price[i].innerText}</span>
            <button class="btn-delete" >
            <i class="fa-solid fa-x"></i>
            </button>
          </div>`;

      $(".list-shoppingbasket").append(orderList);
        
      const newFood = { name: name[i].innerText, price: price[i].innerText };
      shoppingBaskets.push(newFood);
      localStorage.setItem("foods", JSON.stringify(shoppingBaskets));
    });
  }
});

const shoppingBaskets = [];

$(".list-shoppingbasket").on("click", ".btn-delete", function () {
  const name = document.getElementsByClassName("text-foodName");
  const price = document.getElementsByClassName("text-foodPrice");
  //list안의 btnDel을 선택
  $(this).parent().remove(); //this(btnDel)의 부모(td)의 부모(tr)를 삭제
  
});

//아 시발... 겨우 함
