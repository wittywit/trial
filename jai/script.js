const URL = "https://teachablemachine.withgoogle.com/models/5-5okh4jb/";
    let model, webcam, ctx, labelContainer, maxPredictions;

    // Audio files for each label
    const audioFiles = {
  "nooo": new Audio("https://wittywit.com/trial/media/nooo.mp3"),
        "Ram": new Audio("https://wittywit.com/trial/media/Ram.mp3"),
        "Sita": new Audio("https://wittywit.com/trial/media/Sita.mp3"),
        "baithe": new Audio("https://wittywit.com/trial/media/baithe.mp3")
    };

    let currentLabel = null; // Keep track of the current playing label

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const size = 600;
        const flip = true;
        webcam = new tmPose.Webcam(size, size, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        const canvas = document.getElementById("canvas");
        canvas.width = size;
        canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop(timestamp) {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        const prediction = await model.predict(posenetOutput);

        let highestProbability = 0;
        let detectedLabel = null;

        for (let i = 0; i < maxPredictions; i++) {
            const probability = prediction[i].probability.toFixed(2);
            const className = prediction[i].className;

            if (probability > highestProbability) {
                highestProbability = probability;
                detectedLabel = className;
            }

            const classPrediction = className + ": " + probability;
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        if (detectedLabel !== currentLabel && highestProbability > 0.8) {
            // Stop any currently playing audio
            if (currentLabel && audioFiles[currentLabel]) {
                audioFiles[currentLabel].pause();
                audioFiles[currentLabel].currentTime = 0;
            }

            // Play the new label's audio
            if (audioFiles[detectedLabel]) {
                audioFiles[detectedLabel].play();
                currentLabel = detectedLabel;
            }
        }

        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }