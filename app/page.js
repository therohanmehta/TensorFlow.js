"use client";
import React, { useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handPose from "@tensorflow-models/handpose";
import { KeyPointDetector } from "./components/KeyPointDetector";

function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const runHandPose = async () => {
    const net = await handPose.load();
    console.log("handpose loaderr");

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

      const hand = await net.estimateHands(video);
      // console.log(hand);

      const canvs = canvasRef.current.getContext("2d");
      KeyPointDetector(hand, canvs);
    }
  };

  runHandPose();
  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          width: 600,
          height: 480,
          position: "absolute",
          margin: "auto",
          left: 0,
          top: 0,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: 600,
          height: 480,
          position: "absolute",
          left: 0,
          top: 0,
          margin: "auto",
          // border: "2px solid red",
        }}
      />
    </div>
  );
}

export default Home;
