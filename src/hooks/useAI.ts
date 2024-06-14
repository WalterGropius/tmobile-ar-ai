import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { non_max_suppression } from '../utils/nonMaxSuppression';
import { ConnectionType } from '../types/connection';
import { Webcam } from '../utils/webcam';
import { Detection } from '../types/modelation';
import labels from '../utils/labels.json';

export const useAI = (connectionType: ConnectionType) => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [detections, setDetections] = useState([]);
  const [labeledDetections, setLabeledDetections] = useState<Detection[]>([]);
  const [detecting, setDetecting] = useState(false);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcam = new Webcam();

  const modelName = 'modem';
  const threshold = 0.8;

  useEffect(() => {
    const loadModel = async () => {
      try {
        const yolov7 = await tf.loadGraphModel(`${window.location.origin}/${modelName}_web_model/model.json`, {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions });
            console.log(`AI loading progress: ${fractions}`);
          },
        });

        const dummyInput = tf.ones(yolov7.inputs[0].shape);
        await yolov7.executeAsync(dummyInput).then((warmupResult) => {
          tf.dispose(warmupResult);
          tf.dispose(dummyInput);
        });

        setModel(yolov7);
        setLoading({ loading: false, progress: 1 });
        webcam.open(videoRef); // Open the webcam when model is ready
      } catch (error) {
        console.error('Error loading model:', error);
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

    try {
      const detections = await tf.tidy(() => {
        const input = tf.image
          .resizeBilinear(tf.browser.fromPixels(videoRef.current), model_dim)
          .div(255.0)
          .transpose([2, 0, 1])
          .expandDims(0);

        const res = model.execute(input) as tf.Tensor;
        const resArray = res.arraySync()[0];
        const detections = non_max_suppression(resArray);
        tf.dispose(res);
        return detections;
      });

      setDetections(detections);
      console.table(detections);
    } catch (error) {
      console.error('Error during detection:', error);
    } finally {
      setDetecting(false);
    }
  };

  const handleExecute = async () => {
    if (model && !detecting) {
      await detectFrame();
      console.log('Detections:', labeledDetections); // Debugging line
    }
  };

  return {
    labeledDetections,
    loading,
    detectFrame,
    handleExecute,
    videoRef,
    detections,
  };
};