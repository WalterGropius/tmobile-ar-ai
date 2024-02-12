import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
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

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [debugMode, setDebugMode] = useState(true);
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

    await model.execute(input).then((res) => {
      // Assuming model.execute returns the output directly without needing to be awaited
      res = res.arraySync(); // Adjust based on how your model outputs the data
    
      var detections = non_max_suppression(res);
      const boxes = shortenedCol(detections, [0,1,2,3]);
      const scores = shortenedCol(detections, [4]);
      const class_detect = shortenedCol(detections, [5]);
      
      processDetections(detections);
      
      if (debugMode) {
        renderBoxes(canvasRef, threshold, boxes, scores, class_detect);
      }
      tf.dispose(res);
    });

    setTimeout(() => requestAnimationFrame(() => detectFrame(model)), 100); // Adjust delay as needed
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
      <header className="App-header">
        <h2>Modem Port and Indicator State detector</h2>
        <button onClick={toggleDebugMode} className={debugMode ? "debug-on" : ""}>Debug</button>
      </header>
      {loading.loading ? (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <div className="content">
          <video autoPlay playsInline muted ref={videoRef} id="frame" />
          <canvas height={640} width={640} ref={canvasRef} style={{ display: debugMode ? "block" : "none" }} />
        </div>
      )}
      <footer className="App-footer">
        {detectedObjects.join(", ")}
      </footer>
    </div>
  );
};

export default App;