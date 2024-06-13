import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Loader from "./components/loader";
import { Webcam } from "./utils/webcam";
import { non_max_suppression } from "./utils/nonMaxSuppression";
import "./style/App.css";
import labels from "./utils/labels.json";

function shortenedCol(arrayofarray, indexlist) {
  return arrayofarray.map(function (array) {
    return indexlist.map(function (idx) {
      return array[idx];
    });
  });
}

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [detections, setDetections] = useState([]);
  const [detecting, setDetecting] = useState(false);
  const videoRef = useRef(null);
  const [model, setModel] = useState(null); // State to hold the loaded model

  const webcam = new Webcam();

  // configs
  const modelName = "yolov7";
  const threshold = 0.8;

  useEffect(() => {
    const loadModel = async () => {
      try {
        const yolov7 = await tf.loadGraphModel(
          `${window.location.origin}/${modelName}_web_model/model.json`,
          {
            onProgress: (fractions) => {
              setLoading({ loading: true, progress: fractions });
            },
          },
        );

        // Warmup
        const dummyInput = tf.ones(yolov7.inputs[0].shape);
        await yolov7.executeAsync(dummyInput).then((warmupResult) => {
          tf.dispose(warmupResult);
          tf.dispose(dummyInput);
        });

        setModel(yolov7);
        setLoading({ loading: false, progress: 1 });
        webcam.open(videoRef); // Open the webcam when model is ready
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  const detectFrame = async () => {
    if (!videoRef.current || !model) {
      return;
    }

    setDetecting(true);
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

      const boxes = shortenedCol(detections, [0, 1, 2, 3]);
      const scores = shortenedCol(detections, [4]);
      const classes = shortenedCol(detections, [5]);

      // renderBoxes(canvasRef, threshold, boxes, scores, classes);
      tf.dispose(res);
      setDetections(detections);
      setDetecting(false);
    });
  };

  const handleExecute = async () => {
    if (model && !detecting) {
      await detectFrame(); // Call detectFrame directly
    }
  };

  console.warn = () => {};
  return (
    <div className="App">
      <h2>Modem Detection Using YOLOv7 & Tensorflow.js</h2>
      {loading.loading ? (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <p> </p>
      )}

      <div className="content">
        <video autoPlay playsInline muted ref={videoRef} id="frame" />

        <button onClick={handleExecute} disabled={loading.loading || detecting}>
          {loading.loading
            ? "Loading..."
            : detecting
              ? "Detecting..."
              : "Execute"}
        </button>

        <div className="results-box">
          <h3>Detections:</h3>
          <ul>
            {detections.length === 0 ? (
              <li>Nothing</li>
            ) : (
              detections.map((detection, index) => (
                <li key={index}>
                  Box: {detection[0].toFixed(2)}, {detection[1].toFixed(2)},{" "}
                  {detection[2].toFixed(2)}, {detection[3].toFixed(2)}
                  <br />
                  Score: {detection[4].toFixed(2)}
                  <br />
                  Class: {labels[detection[5]]}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
