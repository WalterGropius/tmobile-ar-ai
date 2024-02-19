import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Loader from "./components/loader";
import { Webcam } from "./utils/webcam";
import { renderBoxes } from "./utils/renderBox";
import { non_max_suppression } from "./utils/nonMaxSuppression";
import "./style/App.css";
import labels from "./utils/labels";

/**
 * Function to detect image.
 * @param {HTMLCanvasElement} canvasRef canvas reference
 */

function shortenedCol(arrayofarray, indexlist) {
  return arrayofarray.map(function (array) {
      return indexlist.map(function (idx) {
          return array[idx];
      });
  });
}


const Yolo7modem = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [debugMode, setDebugMode] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]); // State to store detected labels and scores
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcam = new Webcam();
  const modelName = "modem";
  const threshold = 0.60;

  const processDetections = (detections) => {
    // Extract labels and their confidence scores
    const labelsAndScores = detections.map(det => {
      const label = labels[det[5]]; // Assuming 'labels' is accessible here
      const score = (det[4] * 100).toFixed(2);
      return `${label}: ${score}%`;
    });
    setDetectedObjects(labelsAndScores);
    console.log(detectedObjects.join(", "));
  };

  const detectFrame = async (model) => {
    const model_dim = [640, 640];
    tf.engine().startScope();
    const input = tf.tidy(() => {
      const img = tf.image
                  .resizeBilinear(tf.browser.fromPixels(videoRef.current), model_dim)
                  .div(255.0)
                  .transpose([2, 0, 1])
                  .expandDims(0);
      return img;
    });

    await model.executeAsync(input).then((res) => {
      res = res.arraySync()[0];
      var detections = non_max_suppression(res);
      const boxes = shortenedCol(detections, [0,1,2,3]);
      const scores = shortenedCol(detections, [4]);
      const class_detect = shortenedCol(detections, [5]);

      processDetections(detections); // Always process detections for footer
      
      if (debugMode) { // Only render boxes if debug mode is enabled
        renderBoxes(canvasRef, threshold, boxes, scores, class_detect);
      }
      tf.dispose(res);
    });

    requestAnimationFrame(() => detectFrame(model));
    tf.engine().endScope();
  };

  useEffect(() => {
    tf.loadGraphModel(`${window.location.origin}/${modelName}_web_model/model.json`, {
      onProgress: (fractions) => setLoading({ loading: true, progress: fractions }),
    }).then(async (yolov7) => {
      const dummyInput = tf.ones(yolov7.inputs[0].shape);
      await yolov7.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);

        setLoading({ loading: false, progress: 1 });
        webcam.open(videoRef, () => detectFrame(yolov7));
      });
    });
  }, []);

  const toggleDebugMode = () => setDebugMode(!debugMode);

  return (
    <div className="App">
     
        
        <button onClick={toggleDebugMode} className={debugMode ? "debug-on" : ""}>D</button>
      
      {loading.loading ? (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <div className="content">
          <video autoPlay playsInline muted ref={videoRef} id="frame" />
          <canvas height={640} width={640} ref={canvasRef} style={{ display: debugMode ? "block" : "none" }} />
        </div>
      )}
    </div>
  );
};

export default Yolo7modem;
