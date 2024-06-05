import { useState, useEffect, useRef, ReactNode } from 'react';
import { non_max_suppression } from '../utils/nonMaxSuppression';
import { HeaderTitle } from '../components/HeaderTitle';
import { renderBoxes } from '../utils/renderBox';
import { Webcam } from '../utils/webcam';
import { Loader } from '../components/Loader';
import labels from '../utils/labels.json';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

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

const shortenedCol = (arrayofarray: unknown[], indexlist: unknown[]) =>
  arrayofarray.map((array) => indexlist.map((idx) => array[idx]));

export const Yolo7modem = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [debugMode, setDebugMode] = useState(false);
  const [next, enableNext] = useState(false);
  const [modemStatus, setModemStatus] = useState<ReactNode>('Analyzuji'); // State for modem status
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcam = new Webcam();
  const modelName = 'modem';
  const threshold = 0.6;
  const connectionType = new URLSearchParams(window.location.hash.replace('#', '')).get('connection');
  const [currentStep, setCurrentStep] = useState(false);
  const [h2Text, setH2Text] = useState('Namiřte na ZADNÍ stranu modemu'); // Initialize correctly

  const currentStepRef = useRef(currentStep);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  const processBackSide = ({ indCount, lightOffCount, cabPowExists, portWanExists, portDslExists }: Data) => {
    if (indCount + lightOffCount >= 4) {
      setModemStatus('Otočte Modem na DRUHOU stranu');
      console.log('Front');
    }

    if (connectionType === 'DSL' && cabPowExists.length > 0 && portWanExists.length > 0) {
      setModemStatus('Správné zapojení');
      console.log('back');
      enableNext(true);
    }

    if (connectionType !== 'DSL' && cabPowExists.length > 0 && portDslExists.length > 0) {
      setModemStatus('Správné zapojení');
      console.log('branch 0 nDSL');
      enableNext(true);
    }
  };

  const lightsToString = (trueValue: string, falseValue: string) => (posLabels) => {
    return posLabels.map(({ label }) => (label === 'lightg' ? trueValue : falseValue)).join('');
  };
  const toBinaryString = lightsToString('1', '0');
  const toEmojiString = lightsToString('🟢', '⚫');

  const processLights = (lights) => {
    // if power on
    if (lights[0].label === 'lightg') {
      const binstr = toBinaryString(lights);
      if (binstr === '111011' || binstr === '111100') {
        setModemStatus('Spravné zapojení');
        enableNext(true);
      }
    } else {
      setModemStatus('Zapněte modem tlačítkem ON/OFF');
    }
  };
  const processFrontSide = ({ lightOffCount, portCount, lights }: Data) => {
    console.log('front');
    if (lights.length === 6) {
      setModemStatus(
        <span className="yolo__modemLights">
          Detekovaný stav:
          <br />
          {toEmojiString(lights)}
        </span>
      );
      processLights(lights);
    } else {
      if (lightOffCount >= 5) {
        setModemStatus('Zapněte modem tlačítkem ON/OFF');
        console.log('zapn');
      }
      if (portCount >= 4) {
        console.log('back');
        setModemStatus('Otočte Modem na DRUHOU stranu');
      }
    }
  };

  const processDetections = (detections: unknown[][]) => {
    const posLabels: PosLabel[] = detections.map(
      (det: unknown[]): PosLabel => ({
        xPosition: parseInt(det[0]),
        label: labels[det[5]],
        score: (det[4] * 100).toFixed(2),
      })
    );

    posLabels.sort((a: PosLabel, b: PosLabel): number => a.xPosition - b.xPosition);
    console.table(posLabels);
    updateModemStatus(posLabels);
  };

  const updateModemStatus = (posLabels: PosLabel[]) => {
    const filterByLabelIncludes = (filterLabel: string) => posLabels.filter(({ label }) => label.includes(filterLabel));
    const filterByLabel = (filterLabel: string) => posLabels.filter(({ label }) => label === filterLabel);

    // There are multiple port and ind classes, we want to count them all
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
    console.log('currentStep: ' + currentStepRef.current);

    if (!currentStepRef.current) {
      processBackSide(data);
    } else {
      processFrontSide(data);
    }
  };

  const detectFrame = async (model) => {
    tf.engine().startScope();

    const input = tf.tidy(() =>
      tf.image
        .resizeBilinear(tf.browser.fromPixels(videoRef.current), [640, 640])
        .div(255.0)
        .transpose([2, 0, 1])
        .expandDims(0)
    );

    const modelRes = await model.executeAsync(input);
    const res = modelRes.arraySync()[0];
    const detections = non_max_suppression(res);
    const boxes = shortenedCol(detections, [0, 1, 2, 3]);
    const scores = shortenedCol(detections, [4]);
    const class_detect = shortenedCol(detections, [5]);

    processDetections(detections); // Always process detections for footer
    console.log('detections');
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
      window.location.href = '/#page=arViewer&connection=' + connectionType;
      window.location.reload();
    } else {
      setCurrentStep(false);
      setH2Text('Namiřte na zadní stranu modemu');
    }
  };

  const handleNextClick = () => {
    if (!currentStep) {
      setCurrentStep(true);
      console.log('Next');
      console.log('currentStep: ' + currentStep);
      setH2Text('Namiřte na PŘEDNÍ stranu modemu');
      setModemStatus('Analyzuji');
      enableNext(false);
    } else {
      window.location.href = '/#page=fin';
    }
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

  return (
    <div className="App">
      {loading.loading ? (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <div className="content">
          <HeaderTitle>
            <h1>AI kontrola zapojení</h1>
            <h2>{h2Text}</h2>
            <h3>{modemStatus}</h3>
          </HeaderTitle>

          <video autoPlay playsInline muted ref={videoRef} id="frame" />
          <canvas height={640} width={640} ref={canvasRef} style={{ display: debugMode ? 'block' : 'none' }} />
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
