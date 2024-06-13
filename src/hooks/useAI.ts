import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; // set backend to webgl
import { non_max_suppression } from '../utils/nonMaxSuppression';
import { ConnectionType } from '../types/connection';
import { renderBoxes } from '../utils/renderBox';
import labels from '../utils/labels.json';
import { Webcam } from '../utils/webcam';

type PosLabel = {
  xPosition: number;
  label: string;
  score: string;
};

type Data = {
  lightOffCount: number;
  portCount: number;
  indCount: number;
  lightonCount: number;
  lights: PosLabel[];
  portDslExists: PosLabel[];
  cabDslExists: PosLabel[];
  cabWanExists: PosLabel[];
  portPowExists: PosLabel[];
  portWanExists: PosLabel[];
  cabPowExists: PosLabel[];
};

const shortenedCol = (arrayofarray: unknown[][], indexlist: number[]) => {
  return arrayofarray.map((array: unknown[]) => {
    return indexlist.map((idx) => {
      return array[idx];
    });
  });
};

export const useAI = (connectionType: ConnectionType) => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [detections, setDetections] = useState([]);
  const [detecting, setDetecting] = useState(false);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcam = new Webcam();

  const modelName = "modem";
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

      tf.dispose(res);
      setDetections(detections);
      setDetecting(false);
    });
  };

  const handleExecute = async () => {
    if (model && !detecting) {
      await detectFrame();
    }
  };

  return {
    detections,
    loading,
    detectFrame,
    videoRef, // Expose videoRef to be used in the component
  };
};