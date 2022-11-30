const ramen = db.collection("라면");

ramen.get().then((result) => {
  result.forEach((doc) => {
    console.log(doc.data());
    var ramenList = `<div class="list-food">
          <img src="../../img/ramen.png" />
          <div class="text-foodInfo">
            <div class="text-foodName">${doc.data().name}</div>
            <div class="text-foodPrice">${doc.data().price}원</div>
          </div>
        </div>`;
    $(".box-left").append(ramenList);
  });
});
