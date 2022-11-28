const tteokBokkiData = db.collection("떡볶이");

tteokBokkiData.get().then((result) => {
  result.forEach((doc) => {
    console.log(doc.data());
    var tteokBokkiList = `<div class="list-food">
          <img src="../../img/dduck.png" />
          <div class="text-foodInfo">
            <div class="text-foodName">${doc.data().name}</div>
            <div class="text-foodPrice">${doc.data().price}원</div>
          </div>
        </div>`;
    $(".box-left").append(tteokBokkiList);
  });
});
