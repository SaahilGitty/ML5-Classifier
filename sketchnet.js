function setup() {
    canvas = createCanvas(800, 800);
    canvas.center();

    classifier = ml5.imageClassifier('Doodlenet', modelLoaded);
    
}

function modelLoaded() { 
    console.log("Model loaded successfully");
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    canvas.mouseReleased(classifier.classify(canvas, gotResult));
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

function clearCanvas() {
    background("white");
}

function saveImage() {
    save("photo");
}