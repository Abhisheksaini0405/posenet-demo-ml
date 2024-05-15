let capture;
let posenet;
let noseX,noseY;
let singlePose;
let leyeX;
let leyeY;
let reyeX;
let reyeY;
let skeleton;
let img;
function setup(){
    createCanvas(800,500);
    capture = createCapture(VIDEO)
    capture.hide();
    posenet = ml5.poseNet(capture,modelLoaded);
    posenet.on('pose',recievedPoses)
    //for uploading the image of actor on A particular part of a body.
    img = loadImage("images/thug.png");
}
function recievedPoses(poses){
    console.log(poses);
    if (poses.length > 0){
        singlePose = poses[0].pose;
        //Make skeleton 
        skeleton = poses[0].skeleton;
    }
}
function modelLoaded()
{
    console.log("Model has loaded");
}
function draw(){
    //background(200);
    image(capture,0,0);
    fill(250,0,0);
    if (singlePose){
        for (let i = 0; i<singlePose.keypoints.length; i++)
            {
            ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y,20);
        }
        stroke(255,255,255);
        strokeWeight(5);
        for (let j = 0;j <skeleton.length; j++){
            line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y)
        }
        //for displaying the image of a actor or any other images.
        image(img,singlePose.nose.x-110,singlePose.nose.y-50,200,200);
    }
}