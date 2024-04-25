window.addEventListener('load', async () => {

    const video = document.getElementById("myvideo");
    const handimg = document.getElementById("handimage");
    const canvas = document.getElementById("canvas_track");
    const context = canvas.getContext("2d");
    let trackButton = document.getElementById("trackbutton");
    let nextImageButton = document.getElementById("nextimagebutton");
    let updateNote = document.getElementById("updatenote");

    let imgindex = 1;
    let isVideo = false;
    let model = null;

    // video.width = 500
    // video.height = 400

    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 20, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.6, // confidence threshold for predictions.
    };

    function startVideo() {
        handTrack.startVideo(video).then(function (status) {
            console.log("video started", status);
            if (status) {
                updateNote.innerText = "Video started. Now tracking";
                isVideo = true;
                runDetection();
            } else {
                updateNote.innerText = "Please enable video";
            }
        });
    }

    function toggleVideo() {
        if (!isVideo) {
            updateNote.innerText = "Starting video";
            startVideo();
        } else {
            updateNote.innerText = "Stopping video";
            handTrack.stopVideo(video);
            isVideo = false;
            updateNote.innerText = "Video stopped";
        }
    }


    trackButton.addEventListener("click", function () {
        toggleVideo();
    });

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let prevHandState = null;
    let prevHandPos = null;

    function runDetection() {
        model.detect(video).then((predictions) => {
            model.renderPredictions(predictions, canvas, context, video);

            predictions.forEach((prediction) => {
                let normX = prediction.bbox[0] / 500;
                let normY = prediction.bbox[1] / 400;

                // if (prevHandPos) {
                //     let distanceX = currentHandPos.x - prevHandPos.x;
                //     let distanceY = currentHandPos.y - prevHandPos.y;
                //     let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                //     let segments = Math.ceil(distance / 10); // Adjust the segment size as needed

                //     for (let i = 1; i <= segments; i++) {
                //         let t = i / segments;
                //         let intermediateX = prevHandPos.x + distanceX * t;
                //         let intermediateY = prevHandPos.y + distanceY * t;
                //         simulateMouseEvent(intermediateX, intermediateY, "mousemove");
                //     }
                // }
                if (prevHandState === "open" && prediction.label === "closed") {
                    simulateMouseEvent(viewportWidth * normX, viewportHeight * normY, "click");
                    prevHandState = "closed";
                }
                else if (prevHandState === "close" && prediction.label === "open") {
                    // Hand goes from closed to open.
                    // Burst?
                    //Do nothing for now.
                    prevHandState = "open";
                }
                else if (prediction.label === "closed") {
                    // change colors and move.
                    prevHandState = "closed";
                }
                else if (prediction.label === "open") {
                    simulateMouseEvent(viewportWidth * normX, viewportHeight * normY, "mousemove");
                    prevHandState = "open";
                }
                prevHandPos = { x: viewportWidth * normX, y: viewportHeight * normY };
            });
            if (isVideo) {
                requestAnimationFrame(runDetection);
            }
        });
    }


    function simulateMouseEvent(x, y, eventName) {
        const canvas = document.getElementById("particles-js").childNodes[0];

        const event = new MouseEvent(eventName, {
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
        });

        canvas.dispatchEvent(event);
    }

    // Load the model.
    handTrack.load(modelParams).then((lmodel) => {
        // detect objects in the image.
        model = lmodel;
        updateNote.innerText = "Loaded Model!";
        trackButton.disabled = false;
    });


});
