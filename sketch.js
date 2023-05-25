let pages = 0; //초기 화면
let capture; //비디오
let poseNet; //포즈 저장
let me; //내 모습
let recordbutton; // 비디오 녹화 버튼
let donebutton; //녹화 완료
let startbutton; //시작버튼
let mention1; //버튼 안내

let videoRecorder;
let mic, fft;
//gif
let person2;
let imgFrame = 0;

//img
let ghost;
let love;
let micImg;
let pallette;

let font1; //질문폰트

function preload() {
  font1 = loadFont("Rajdhani-Regular.ttf");
  font2 = loadFont("Rajdhani-Bold.ttf");
  font3 = loadFont("font3.ttf");
  font4 = loadFont("font4.ttf");
  person2 = loadImage("person2.gif");

  ghost = loadImage("ghost.png");
  love = loadImage("loveimogi.png");
  micImg = loadImage("mic.png");
  pallette = loadImage("pallette.png");
}

function setup() {
  createCanvas(800, 600);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  //github
  // videoRecorder = new p5.VideoRecorder();
  // videoRecorder.onFileReady = showAndSaveVideo;

  //첫 화면에서만 start이고 다음부터는next 어떻게?
  //startbutton for page 0
  startbutton = createButton("START");
  startbutton.position(670, 350);
  startbutton.style("background-color", "#000000"); // 배경색 변경
  startbutton.style("color", "white"); // 글꼴 색상 변경
  startbutton.style("font-size", "20px"); // 글꼴 크기 변경
  startbutton.style("font", "font2"); //
  startbutton.style("padding", "10px");
  startbutton.mousePressed(startgame);

  //nextbutton for page 1,2,3
  nextbutton = createButton("NEXT");
  nextbutton.position(675, 350);
  nextbutton.style("background-color", "#000000");
  nextbutton.style("color", "white");
  nextbutton.style("font-size", "20px");
  nextbutton.style("font", "font2");
  nextbutton.style("padding", "10px");
  nextbutton.mousePressed(startgame);

  //endbutton for page 4
  endbutton = createButton("HOME");
  endbutton.position(670, 500);
  endbutton.style("background-color", "#000000");
  endbutton.style("color", "white");
  endbutton.style("font-size", "20px");
  endbutton.style("font", "font2");
  endbutton.style("padding", "10px");
  endbutton.mousePressed(startgame);

  //recordbt
  recordbutton = createButton("record");
  recordbutton.position(675, 430);
  recordbutton.style("background-color", "#000000");
  recordbutton.style("color", "white");
  recordbutton.style("font-size", "20px");
  recordbutton.style("font", "font2");
  recordbutton.style("padding", "10px");
  recordbutton.mousePressed(recordvideo);

  //donebt
  donebutton = createButton("done");
  donebutton.position(685, 505);
  donebutton.style("background-color", "#000000");
  donebutton.style("color", "white");
  donebutton.style("font-size", "20px");
  donebutton.style("font", "font2");
  donebutton.style("padding", "10px");
  donebutton.mousePressed(donevideo);

  //비디오만들기
  push();
  capture = createCapture(VIDEO);
  capture.size(800, 600);
  capture.position(0, 0);
  capture.hide();
  pop();
}

//start함수
function startgame() {
  pages++;
  if (pages > 4) {
    pages = 0;
  }
  //첫번째 질문 페이지 시작
}
//레코드 버튼을 클릭했을 때 함수 변화
function recordvideo() {}
//done 버튼 클릭했을 때 녹화 완료

function donevideo() {}

function modelLoaded() {
  print("loaded");
}

function onPose(poses) {
  // if there is a detected pose, save the pose information in myPose varaible.
  if (poses.length > 0) {
    me = poses[0].pose;
  } else {
    me = null;
  }
}
poseNet = ml5.poseNet(capture, modelLoaded);
poseNet.on("pose", onPose);

function draw() {
  background(220);

  // push();
  // translate(800, 0);
  // scale(-1, 1);
  // image(capture, 0, 0);
  // pop();

  if (pages === 0) {
    //초기 멘트

    push();
    translate(800, 0);
    scale(-1, 1);
    image(capture, 0, 0);
    pop();

    fill(255);
    textFont(font1);
    textSize(30);
    textAlign(CENTER);
    text("WHEN YOU REDAY, PLEASE PRESS START BUTTON!", width / 2, 60);

    startbutton.show();
    nextbutton.hide();
    endbutton.hide();
    recordbutton.show();
    donebutton.show();
  }

  if (pages === 1) {
    push();
    translate(800, 0);
    scale(-1, 1);
    image(capture, 0, 0);
    pop();

    image(person2, 400, 50, 350, 570);
    person2.setFrame(int(imgFrame));
    imgFrame += 0.25;
    if (imgFrame > person2.numFrames() - 1) {
      imgFrame = 0;
    }

    fill(255);
    textFont(font1);
    textSize(30);
    textAlign(CENTER);
    text(
      "How would you react if you met a friend \n you haven't seen for a long time on the street?",
      width / 2,
      60
    );
    startbutton.hide();
    nextbutton.show();
    endbutton.hide();
  }
  if (pages === 2) {
    capture.hide();
    capture.loadPixels();
    noStroke();
    for (let i = 0; i < capture.width; i += 10) {
      for (let j = 0; j < capture.height; j += 10) {
        let idx = (i + j * capture.width) * 4;
        let r = capture.pixels[idx];
        let g = capture.pixels[idx + 1];
        let b = capture.pixels[idx + 2];
        let brightness = (r + g + b) / 3;

        fill(color(r, g, b));
        ellipse(i, j, brightness * 0.09);
      }
    }
    fill(0);
    rect(50, 30, 700, 40);
    fill(255);
    textFont(font1);
    textSize(30);
    textAlign(CENTER);
    text("If You were a drawing, what pose would You do?", width / 2, 60);
    startbutton.hide();
    nextbutton.show();
    endbutton.hide();
  }

  if (pages === 3) {
    //capture.hide();
    push();
    translate(800, 0);
    scale(-1, 1);
    image(capture, 0, 0);
    pop();

    fill(255);
    textFont(font1);
    textSize(30);
    textAlign(CENTER);
    text("Would you sing your favorite song?", width / 2, 60);

    startbutton.hide();
    nextbutton.show();
    endbutton.hide();

    let spectrum = fft.analyze();
    noStroke();

    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);

      let r = map(i, 0, spectrum.length, 0, 255);
      let g = map(i, 0, spectrum.length, 255, 0);
      let b = 255;

      fill(r, g, b);

      // 막대의 크기와 위치에 애니메이션 효과를 주기 위해 sin 함수를 사용합니다.
      let animationOffset = map(sin(frameCount * 0.05), -1, 1, 0, 40);
      let rectHeight = h + animationOffset;

      rect(x, height, width / spectrum.length, rectHeight);
    }
  }

  if (pages === 4) {
    push();
    scale(0.2);
    image(ghost, 2800, 1700);
    pop();
    startbutton.hide();
    nextbutton.hide();
    recordbutton.hide();
    donebutton.hide();
    endbutton.show();
    fill(0);
    rect(50, 130, 250, 200);
    rect(260, 350, 250, 200);
    rect(470, 130, 250, 200);

    fill(0);
    textSize(30);
    textAlign(CENTER);
    textFont(font4);
    text("The side of me that I haven't seen before", 400, 50);
    text("INSIDE ME", 700, 490);

    textSize(15);
    textFont(font1);
    fill("#4F004C");
    text("When meeting a dear friend,", 170, 120);
    text("What if I were a model \n for a famous painting?", 600, 100);
    text("When I sing\n my favorite song~", 160, 500);

    push();
    scale(0.1);
    image(love, 6300, 100);
    pop();

    push();
    scale(0.1);
    image(micImg, 2000, 4500);
    pop();

    push();
    scale(0.1);
    image(pallette, 4000, 1500);
    pop();
  }
}
