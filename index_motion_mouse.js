import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";

var sc_width = window.innerWidth;
var sc_height = window.innerHeight;

var frame = 0;
function animate() {
  requestAnimationFrame(animate);
  // [...]

  sc_width = window.innerWidth;
  sc_height = window.innerHeight;
  // [...]
  var camera_acction = moveElemAlongPath(camera_img, camera_motion, frame);
  if (camera_acction == 1) {
    camera_img.innerHTML = "📸 click!";
    camera_img.style.setProperty("background-color", "white");
  } else {
    camera_img.innerHTML = "📷";
    camera_img.style.setProperty("background-color", "rgba(0,0,0, 0)");
  }

  var make_acction = moveElemAlongPath(make, make_motion, frame);
  if (make_acction == 1) {
    make.innerHTML = "⚒️ clang!";
    make.style.setProperty("background-color", "white");
  } else {
    make.innerHTML = "⚒️";
    make.style.setProperty("background-color", "rgba(0,0,0, 0)");
  }

  name_t.style.setProperty(
    "transform",
    "scale(1," + 10 * Math.sin((frame / 100) % 360) + 1 + ")"
  );

  random.style.setProperty("transform", "rotate(" + (frame % 360) + "deg)");

  frame += 1;
}
requestAnimationFrame(animate);

var camera = document.getElementById("camera");
var camera_img = document.getElementById("camera-img");

var pc = document.getElementById("pc");

var make = document.getElementById("make");

var random = document.getElementById("random");

var name_t = document.getElementById("t");

var camera_motion = getArrayFromCSV("data/camera.csv");
var make_motion = getArrayFromCSV("data/make.csv");
// var pc_motion = getArrayFromCSV("data/camera.csv");
// var make_motion = getArrayFromCSV("data/camera.csv");
// var random_motion = getArrayFromCSV("data/camera.csv");

function moveElemAlongPath(_elem, _array, _frame) {
  var repeated_frame = _frame % _array.length;
  var current_data = _array[repeated_frame];
  var x = (current_data[2] * sc_width) / 1920;
  var y = (current_data[3] * sc_height) / 1080;
  _elem.style.setProperty("transform", "translate(" + x + "px, " + y + "px)");

  var acction = current_data[4];
  return acction;
}

function actionElement(_elem, _array, _frame, func) {
  var acction = current_data[4];
  if (acction == 1) {
    func;
  }
}

function getArrayFromCSV(url) {
  let csv = new XMLHttpRequest();
  let csvArray = [];
  // CSVファイルへのパス
  csv.open("GET", url, false);
  // csvファイル読み込み失敗時のエラー対応
  try {
    csv.send(null);
  } catch (err) {
    console.log(err);
  }
  // 改行ごとに配列化
  let lines = csv.responseText.split(/\r\n|\n/);
  // 1行ごとに処理
  for (let i = 0; i < lines.length; ++i) {
    let cells = lines[i].split(",");
    if (cells.length != 1) {
      csvArray.push(cells);
    }
  }
  // コンソールに配列を出力
  console.log(csvArray);

  return csvArray;
}
