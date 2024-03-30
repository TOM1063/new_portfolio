import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";

var sc_width = screen.width;
var sc_height = screen.height;

var frame = 0;
function animate() {
  requestAnimationFrame(animate);
  // [...]

  sc_width = screen.width;
  sc_height = screen.height;
  // [...]
  var camera_acction = moveElemAlongPath(camera, camera_motion, frame);
  if (camera_acction == 1) {
    camera.innerHTML = "📸 click!";
  } else {
    camera.innerHTML = "📷";
  }

  var make_acction = moveElemAlongPath(make, make_motion, frame);
  if (camera_acction == 1) {
    make.innerHTML = "⚒️ clang!";
  } else {
    make.innerHTML = "⚒️";
  }

  random.style.setProperty("transform", "rotate(" + frame / 10 + ")");

  frame += 1;
}
requestAnimationFrame(animate);

var camera = document.getElementById("camera");
var pc = document.getElementById("pc");
var make = document.getElementById("make");
var random = document.getElementById("random");

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
