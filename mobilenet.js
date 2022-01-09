function setup() {
    canvas = createCanvas(800, 800);
    
    video = createCapture(VIDEO)
    video.hide()

    classifier = ml5.imageClassifier('Mobilenet', modelLoaded);
    
}

function modelLoaded() { 
    console.log("Model loaded successfully");
}

function draw() {
    image(video, 0, 0, 800, 600)
    classifier.classify(video, gotResult)
}

function gotResult(results, error) {
    if(error)
    {
        console.error(error);
    }
    else {
        if((results[0].confidence > 0.5) &&(result != previousResult)) {
            Debug.Log(results[0]);
            document.getElementById('obj').innerHTML = results[0].label;
            document.getElementById('acc').innerHTML = results[0].confidence;
            result = previousResult;

            var synth = window.SpeechSynthesis
            speak_data = "That looks like a " + results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
    }
}

function saveImage() {
    save("photo");
}