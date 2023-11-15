<img src="https://velog.velcdn.com/images/phjjj/post/71f0702d-c565-4805-b5ed-d6f00290896a/image.png" width="20%" height="20%">


> ### 프로젝트 소개
Github
[https://phjjj.github.io/kiosk/screen/orderscreen/orderscreen.html](https://phjjj.github.io/kiosk/screen/orderscreen/orderscreen.html)

처음 프론트엔드 생태계에 접하고 js,html,css을 이용해 만든 프로젝트로, 사람의 얼굴을 인식하고 face-api를 이용해 나이를 추정 후, 추천 음식을 제공 해주는 사이트입니다.


- #### 소요기간
4주(2022.9 ~ 10)

>### 📚 사용기술

Front

JS CSS HTML jquery

Back 

Firebase

그 외
face-api

배포
Github.io


 #### - 주요기술 및 사용목적

- face-api (https://github.com/justadudewhohacks/face-api.js)
보통 영상인식이나 딥러닝은 파이썬언어와 관련이 깊은데, faceaApi는 텐서플로우js를 이용해 만들었으며, 웹 및 모바일 장치 실행 가능하도록 최적화된 모델을 제공해줍니다. 또한 외부에 종속되어 있지 않아, 프론트에서 즉시 처리가 되어 사용이 가능합니다

- Firebase
firebase를 사용한 경험이 있어서, 프론트 자체적으로 음식데이터들을 저장 할 수 있었으나 조금 더 다르게 관리해보고싶어서 



> ### 주요 기능 구현 방법 및 문제 해결

### 1. face-API 사용하기
```jsx
const video = document.getElementById("video");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
  faceapi.nets.faceExpressionNet.loadFromUri("../models"),
  faceapi.nets.ageGenderNet.loadFromUri("../models"),
]).then(startVideo());


function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.log(err);
    });
}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  $(".header-center").append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const predictions = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withAgeAndGender();

    const resizedDetections = faceapi.resizeResults(predictions, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    


    resizedDetections.forEach((result) => {
      const { age } = result;
      new faceapi.draw.DrawTextField(
        [`${faceapi.round(age, 0)} 세`],
        result.detection.box.bottomLeft
      ).draw(canvas);


      localStorage.setItem("age", Math.floor(age / 10) * 10);
    });
  }, 600);
});
```
api 사용 예시 코드가 있어서 어렵지 않았지만 프로젝트 당시 100% 이해를 하지 않고 조금 수정 하여 다시 보니 아 이랬구나 생각이 들었습니다.

face-api를 사용할 때는 프로젝트 내 폴더에 모델들이 저장되어있어 모델들을 불러들인 후 html내부의 캠이 켜진다면 비디오를 표시합니다, 그 후에 addEventListener()을 통해 video 가 play일 때 비디오 위에 캔버스를 생성하고 그 위에 얼굴 감지 및 랜드마크를 캔버스에 그리게 됩니다

---
### 2. Firebase 사용하기
```jsx
// firebase.js

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
```
파이어베이스에 프로젝트를 먼저 등록 시킨 후 코드로 불러오게하였고, 
```<script src="../../js/firebase.js"></script>```
스크립트 태그로 db를 불러 등록된 음식을 프론트로 제공할 수 있게 하였습니다
```jsx
// gimbab.js

if (storageItems) {
  storageItems.forEach((e) => {
    addToFood(e);
    shoppingBasketsArr.push(e);
  });
}
gimbab.get().then((result) => {
  result.forEach((doc) => {
    const gimbabList = `<button class="list-food">
          <img src="../../img/gimbab.png" />
          <div class="text-foodInfo">
            <div class="text-foodName">${doc.data().name}</div>
            <div class="text-foodPrice">${doc.data().price}원</div>
          </div>
        </button>`;
    $(".box-left").append(gimbabList);
  });
  ```
>### 프로젝트를 진행하면서 알게된 점

- Promise
프라미스 클래스를 사용하면서, **비동기코드와 콜백함수**에 대해 좀 더 공부하게되었습니다. 
해당 프로젝트에스는 Promise.all을 사용해서 비동기코드로 모델들을 받아온 후 성공적으로 받아온다면 then()을 이용해 다음 함수를 호출하였습니다.

- firebase 경험
백엔드와 데이터베이스를 다루는 경험이 없었기에 데이터베이스들을 쉽게 저장 할 수 있는 콘솔을 이용해서 간접적으로 다루는 방법을 배우고, **데이터들을 불러와서 프론트에 보여주는 방법에 대해 알게되었습니다
**
- jquery
프로젝트를 진행하다가 제이쿼리를 알게되었는데 querySelector와 같은 메소드를 이용하지 않고 좀 더 편한 문법을 이용해서 html 태그에 접근 할 수 있었습니다

>### 개선사항

### 미숙한 CSS
개발을 할 때의 해상도로 css를 진행했는데, 하고 보니 다른 디스플레이에서는 각각의 오브젝트들이 뒤죽박죽이어서 앞으로는 좀 더 신경써야 되겠다고 느꼈습니다.

### 클린 코드
거의 손코딩을 하다시피 하드코딩을 했는데, 가독성이 많이 떨어지고 똑같은 코드의 반복이 일어나서 앞으로는 **코드 모듈화에 대해 많이 생각을 해야겠다고 느꼈습니다.**

---
처음 프로젝트라 많이 미숙하고 솔직히 팀프로젝트였는데 ㅋㅋ.. 그 당시에 프로젝트를 진행할 때는 어렵다 생각한 부분이 지금 와서는 금방 이해를 한거 보니 나름 성장한것 같다


