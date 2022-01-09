noseX = 0;
noseY = 0;

function preload() {
  clown_nose = loadImage('nose.png');
}

function setup() {
  createCanvas(400, 400);
  
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide()
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)
}

function modelLoaded() {
  console.log("poseNet Loaded Successfully.")
}

function gotPoses(results) {
    if (error) {
        Debug.Log(error);
    } else {
        if (results.length > 0) {
            console.log(results)
            noseX = results[0].pose.nose.x +120;
            noseY = results[0].pose.nose.y + 60;
        }
    }
}

function draw() {
  image(video, 0, 0, 800, 600)
  image(clown_nose, noseX, noseY, 50, 50)
}

function saveImage() {
  save("photo");
}