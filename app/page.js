"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handPose from "@tensorflow-models/handpose";
import { KeyPointDetector } from "./components/KeyPointDetector";
import * as fp from "fingerpose";
import Image from "next/image";

function Home() {
  const [HandPose, setHandPose] = useState("");
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const runHandPose = async () => {
    const net = await handPose.load();
    // console.log("handpose loaderr");

    setInterval(() => {
      detect(net);
    }, 1000);
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

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures.length > 0) {
          console.log(gesture.gestures[0].name);
          setHandPose(gesture.gestures[0].name);
        }
      }

      const canvs = canvasRef.current.getContext("2d");
      KeyPointDetector(hand, canvs);
    }
  };

  runHandPose();
  return (
    <div className="h-screen flex items-center justify-center border bg-danger w-screen relative">
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
      {HandPose == "thumbs_up" && (
        <Image
          style={{ zIndex: 9 }}
          className="position-absolute top-0"
          src={"/thumbsup.gif"}
          height={100}
          width={100}
          alt="11"
        />
      )}
      {HandPose == "victory" && (
        <Image
          style={{ zIndex: 9 }}
          className="position-absolute top-0"
          src={"/victory.gif"}
          height={100}
          width={100}
          alt="11"
        />
      )}
    </div>
  );
}

export default Home;
