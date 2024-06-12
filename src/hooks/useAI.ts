import { ReactNode, useEffect, useRef, useState } from 'react';
import { non_max_suppression } from '../utils/nonMaxSuppression';
import { ConnectionType } from '../types/connection';
import { renderBoxes } from '../utils/renderBox';
import labels from '../utils/labels.json';
import * as tf from '@tensorflow/tfjs';

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

const shortenedCol = (arrayofarray: unknown[][], indexlist: number[]) =>
  arrayofarray.map((array: unknown[]) => indexlist.map((idx) => array[idx]));

export const useAI = (connectionType: ConnectionType) => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [debugMode, setDebugMode] = useState(false);
 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const threshold = 0.6;
  let model: tf.GraphModel | null = null;

  const processDetections = (detections: unknown[][]) => {
    const posLabels: PosLabel[] = detections.map(
      (det: unknown[]): PosLabel => ({
        xPosition: parseInt(det[0] as string),
        label: labels[det[5] as number],
        score: ((det[4] as number) * 100).toFixed(2),
      })
    );

    posLabels.sort((a: PosLabel, b: PosLabel): number => a.xPosition - b.xPosition);
    console.table(posLabels);
  };

  const updateModemStatus = (posLabels: PosLabel[]) => {
    const filterByLabelIncludes = (filterLabel: string) => posLabels.filter(({ label }) => label.includes(filterLabel));
    const filterByLabel = (filterLabel: string) => posLabels.filter(({ label }) => label === filterLabel);

    const data: Data = {
      lightOffCount: filterByLabel('lightoff').length,
      portCount: filterByLabelIncludes('port').length,
      indCount: filterByLabelIncludes('ind').length,
      lightonCount: filterByLabel('lightg').length,
      lights: filterByLabelIncludes('light'),
      portDslExists: filterByLabel('portdsl'),
      cabDslExists: filterByLabel('cabdsl'),
      cabWanExists: filterByLabel('cabwan'),
      portPowExists: filterByLabel('portpow'),
      portWanExists: filterByLabel('portwan'),
      cabPowExists: filterByLabel('cabpow'),
    };

    console.table(data);
  };

  const captureAndDetect = async (containerRef) => {
    if (!model) return;

    tf.engine().startScope();

    const input = tf.tidy(() => {
      const canvas = containerRef.current;
      const context = canvas.getContext('2d');
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      return tf.browser.fromPixels(imageData)
        .resizeBilinear([640, 640])
        .div(255.0)
        .transpose([2, 0, 1])
        .expandDims(0);
    });

    const modelRes = await model.executeAsync(input);
    const res = modelRes.arraySync()[0];
    const detections = non_max_suppression(res);
    const boxes = shortenedCol(detections, [0, 1, 2, 3]);
    const scores = shortenedCol(detections, [4]);
    const class_detect = shortenedCol(detections, [5]);

    processDetections(detections);
    if (debugMode) {
      renderBoxes(canvasRef, threshold, boxes, scores, class_detect);
    }
    tf.dispose(res);
    tf.engine().endScope();
  };

  useEffect(() => {
    tf.loadGraphModel(`${window.location.origin}/modem_web_model/model.json`, {
      onProgress: (fractions) => setLoading({ loading: true, progress: fractions }),
    }).then(async (loadedModel) => {
      model = loadedModel;
      const dummyInput = tf.ones(model.inputs[0].shape);
      await model.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);
        setLoading({ loading: false, progress: 1 });
      });
    });
  }, []);

  return {
    captureAndDetect,
    loading,
  };
};