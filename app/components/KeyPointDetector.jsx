const fingerData = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinkyFinger: [0, 17, 18, 19, 20],
  };
  
  export const KeyPointDetector = (predictions, canvas) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const landmarks = prediction.landmarks;
        for (let j = 0; j < Object.keys(fingerData).length; j++) {
          let finger = Object.keys(fingerData)[j];
          for (let k = 0; k < fingerData[finger].length - 1; k++) {
            const firstJointIndex = fingerData[finger][k];
            const secondJointIndex = fingerData[finger][k + 1];
  
            canvas.beginPath();
            canvas.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
            );
            canvas.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
            );
            canvas.strokeStyle = "pink";
            canvas.lineWidth = 4;
            canvas.stroke(); // This actually draws the line
          }
        }
        for (let i = 0; i < landmarks.length; i++) {
          const x = landmarks[i][0];
          const y = landmarks[i][1];
          canvas.beginPath();
          canvas.arc(x, y, 7, 0, 3 * Math.PI);
          canvas.fillStyle = "red";
          canvas.fill();
        }
      });
    }
  };

  