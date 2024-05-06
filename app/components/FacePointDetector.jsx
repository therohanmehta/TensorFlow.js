export const FacePointDetector = (predictions, canvas) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;

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
