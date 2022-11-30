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
});
