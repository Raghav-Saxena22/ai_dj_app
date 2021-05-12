song = "";
song2 = "";
left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;
leftWrist_score = 0;
rightWrist_score = 0;
function preload()
{
song = loadSound("music.mp3");
song2 = loadSound("song2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded); 
    poseNet.on('pose', gotPoses) 
}

function modelLoaded()
{
 console.log('PoseNet is Initialized')       
}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    leftWrist_score = results[0].pose.keypoints[9].score;
    rightWrist_score = results[0].pose.keypoints[10].score;
    left_wristX = results[0].pose.leftWrist.x;
    left_wristY = results[0].pose.leftWrist.y;
    console.log(left_wristX);
    console.log(left_wristY);
    right_wristX = results[0].pose.rightWrist.x;
    right_wristY = results[0].pose.rightWrist.y;
    console.log(right_wristY);
    console.log(right_wristX);
    console.log(rightWrist_score);
}
}

function draw()
{
    image(video,0,0,600,500);

    fill("yellow");
    stroke("yellow");
    

    if(leftWrist_score > 0.2)
    {
        circle(left_wristX,left_wristY,20);
        song.stop();
        song2.play();
        song.setVolume(1);
        document.getElementById("song_name").innerHTML = "Peter Pan"; 
    }
    else if(rightWrist_score > 0.01)
    {
        circle(right_wristX,right_wristY,20);
        song.play();
        song2.stop();
        song.setVolume(1);
        document.getElementById("song_name").innerHTML = "Harry Poter";
    }
    else
    {
        song.stop()
        song2.stop()
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);   
}