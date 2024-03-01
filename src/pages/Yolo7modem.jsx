//page 5

import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Loader from "../components/loader";
import { Webcam } from "../utils/webcam";
import { renderBoxes } from "../utils/renderBox";
import { non_max_suppression } from "../utils/nonMaxSuppression";

import labels from "../utils/labels.json";

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
  const [next, enableNext] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]); // State to store detected labels and scores
  const [modemStatus, setModemStatus] = useState("Analyzuji"); // State for modem status
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcam = new Webcam();
  const modelName = "modem";
  const threshold = 0.6;
  const connectionType = new URLSearchParams(
    window.location.hash.replace("#", "")
  ).get("connection");
  const [currentStep, setCurrentStep] = useState(false);
  const [h2Text, setH2Text] = useState("Namiřte na ZADNÍ stranu modemu"); // Initialize correctly

  const currentStepRef = useRef(currentStep)

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep])

  const processBackSide = ({
    indCount,
    lightoffCount,
    cabpowExists,
    portwanExists,
    portdslExists,
  }) => {
    if (indCount + lightoffCount >= 4) {
      setModemStatus("Otočte Modem na druhou stranu");
      console.log("Front");
    }

    if (
      connectionType === "DSL" &&
      cabpowExists.length > 0 &&
      portwanExists.length > 0
    ) {
      setModemStatus("Správné zapojení");
      console.log("back");
      enableNext(true);
    }

    if (
      connectionType !== "DSL" &&
      cabpowExists.length > 0 &&
      portdslExists.length > 0
    ) {
      setModemStatus("Správné zapojení");
      console.log("branch 0 nDSL");
      enableNext(true);
    }
  };

  const lightsToString = (trueValue, falseValue) => (posLabels) => {
    return posLabels
      .map(({ label }) => (label === "lightg" ? trueValue : falseValue))
      .join("");
  };
  const toBinaryString = lightsToString("1", "0");
  const toEmojiString = lightsToString("🟢", "⚫");

  const processLights = (lights) => {
    // if power on
    if (lights[0].label === "lightg") {
      binstr = toBinaryString(lights);
      if (binstr === "111011" || binstr === "111100") {
        setModemStatus("Spravné zapojení");
        enableNext(true);
      }
    } else {
      setModemStatus("Zapněte modem tlačítkem ON/OFF");
    }
  };
  const processFrontSide = ({
    lightoffCount,
    portCount,
    lightonCount,
    lights,
  }) => {
    console.log("front");
    if (lights.length === 6) {
      setModemStatus(toEmojiString(lights));
      processLights(lights);
    } else {
      if (lightoffCount >= 5) {
        setModemStatus("Zapněte modem tlačítkem ON/OFF");
        console.log("zapn");
      }

      if (portCount >= 4) {
        console.log("back");
        setModemStatus("Otočte Modem na DRUHOU stranu");
      }

      /* if (lightonCount >= 4) {
      console.log("branch 1 on");
      setModemStatus("Správné Zapojení");
      console.log("hura");
      enableNext(true); */
    }
  };

  const processDetections = (detections) => {
    const posLabels = detections.map((det) => {
      const label = labels[det[5]];
      const score = (det[4] * 100).toFixed(2);
      const pos = parseInt(det[0]);
      return {
        xPosition: pos,
        label: label,
      };
    });

    posLabels.sort((a, b) => a.xPosition - b.xPosition);
    setDetectedObjects(posLabels);
    console.table(posLabels);
    updateModemStatus(posLabels);
  };

  const updateModemStatus = (posLabels) => {
    const filterByLabelIncludes = (filterLabel) =>
      posLabels.filter(({ label }) => label.includes(filterLabel));
    const filterByLabel = (filterLabel) =>
      posLabels.filter(({ label }) => label === filterLabel);

    // There are multiple port and ind classes, we want to count them all
    const portCount = filterByLabelIncludes("port").length;
    const indCount = filterByLabelIncludes("ind").length;

    const lightoffCount = filterByLabel("lightoff").length;
    const lightonCount = filterByLabel("lightg").length;
    const lights = filterByLabelIncludes("light");

    const portpowExists = filterByLabel("portpow");
    const portdslExists = filterByLabel("portdsl");
    const portwanExists = filterByLabel("portwan");

    const cabpowExists = filterByLabel("cabpow");
    const cabdslExists = filterByLabel("cabdsl");
    const cabwanExists = filterByLabel("cabwan");

    const data = {
      lightoffCount,
      portCount,
      indCount,
      lightonCount,
      lights,
      portdslExists,
      cabdslExists,
      cabwanExists,
      portpowExists,
      portwanExists,
      cabpowExists,
    };

    console.table(data);

    console.log("currentStep: " + currentStepRef.current);

    if (!currentStepRef.current) {
      processBackSide(data);
    } else {
      processFrontSide(data);
    }
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

    const modelRes = await model.executeAsync(input);
    const res = modelRes.arraySync()[0];
    const detections = non_max_suppression(res);
    const boxes = shortenedCol(detections, [0, 1, 2, 3]);
    const scores = shortenedCol(detections, [4]);
    const class_detect = shortenedCol(detections, [5]);

    processDetections(detections); // Always process detections for footer
    console.log("detections");
    if (debugMode) {
      // Only render boxes if debug mode is enabled
      renderBoxes(canvasRef, threshold, boxes, scores, class_detect);
    }
    tf.dispose(res);

    requestAnimationFrame(() => detectFrame(model));
    tf.engine().endScope();
  };

  const handlePreviousClick = () => {
    if (!currentStep) {
      // Redirect when at step 0
      window.location.href = "/#page=4&connection=" + connectionType;
      window.location.reload();
    } else {
      setCurrentStep(false);
      setH2Text("Namiřte na zadní stranu modemu");
    }
  };

  const handleNextClick = () => {
    if (!currentStep) {
      setCurrentStep(true);
      console.log("Next");
      console.log("currentStep: " + currentStep);
      setH2Text("Namiřte na přední stranu modemu");
      enableNext(false);
    } else {
      window.location.href = "/#page=6"; //&connection=" + connectionType; // Replace as needed
    }
  };

  const toggleDebugMode = () => setDebugMode(!debugMode);

  useEffect(() => {
    tf.loadGraphModel(
      `${window.location.origin}/${modelName}_web_model/model.json`,
      {
        onProgress: (fractions) =>
          setLoading({ loading: true, progress: fractions }),
      }
    ).then(async (yolov7) => {
      const dummyInput = tf.ones(yolov7.inputs[0].shape);
      await yolov7.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);

        setLoading({ loading: false, progress: 1 });
        webcam.open(videoRef, () => detectFrame(yolov7));
      });
    });
  }, []);

  return (
    <div className="App">
      {loading.loading ? (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <div className="content">
          <div className="header">
            <h1>AI kontrola zapojení</h1>
            <h2>{h2Text}</h2>
            <h3>{modemStatus}</h3>
          </div>

          <video autoPlay playsInline muted ref={videoRef} id="frame" />
          <canvas
            height={640}
            width={640}
            ref={canvasRef}
            style={{ display: debugMode ? "block" : "none" }}
          />
          {!next && (
            <div className="wrapper">
              <div className="spinner" />
            </div>
          )}
          <footer>
            <button onClick={handlePreviousClick}>Zpět</button>
            {next && <button onClick={handleNextClick}>Pokračovat</button>}
          </footer>
        </div>
      )}
    </div>
  );
};

export default Yolo7modem;
