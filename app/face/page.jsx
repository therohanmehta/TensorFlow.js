"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handPose from "@tensorflow-models/handpose";
// import * as fp from "fingerpose";
import Image from "next/image";
import * as faceDetect from "@tensorflow-models/facemesh";
import { FacePointDetector } from "../components/FacePointDetector";

function Face() {
  const [HandPose, setHandPose] = useState("");
  const [appReady, setAppReady] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = await faceDetect.load({
      inputResolution: { width: 600, height: 480 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current != undefined &&
      webcamRef.current != null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoHeight = webcamRef.current.video.videoHeight;
      const videoWidth = webcamRef.current.video.videoWidth;

      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
      console.log(face);
      const canvs = canvasRef.current.getContext("2d");
      FacePointDetector(face, canvs);
      if (face.length > 0) {
      }
    }
  };

  runFacemesh();
  return (
    <>
      <div className="h-screen flex items-center justify-center border bg-danger w-screen relative">
        {setAppReady ? <h1>App is ready</h1> : <h1>Loading</h1>}
        {/* testing changes */}
        <Webcam
          ref={webcamRef}
          style={{
            width: 600,
            height: 480,
            position: "absolute",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            width: 600,
            height: 480,
            position: "absolute",
            // left: 0,
            // top: 0,
            margin: "auto",
            border: "2px solid red",
          }}
        />
        {/* {HandPose == "thumbs_up" && (
        <Image
          style={{ zIndex: 9 }}
          className="position-absolute top-0"
          src={"/thumbsup.gif"}
          height={100}
          width={100}
          alt="11"
        />
      )} */}
        {/* {HandPose == "victory" && (
        <Image
          style={{ zIndex: 9 }}
          className="position-absolute top-0"
          src={"/victory.gif"}
          height={100}
          width={100}
          alt="11"
        />
      )} */}
      </div>
    </>
  );
}

export default Face;
