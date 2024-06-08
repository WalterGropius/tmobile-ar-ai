import { useEffect, useRef, useState } from 'react';
import { ConnectionType } from '../types/connection';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export const useAR = (connectionType: ConnectionType) => {
  const containerRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const portPlaneRef = useRef(null);
  const imagePlaneRef = useRef(null);
  const imagePlaneRef2 = useRef(null);

  const initPortPlane = (plane, step) => {
    if (step === 2) {
      plane.position.set(-0.38, -0.3, 0);
    } else if (step === 3) {
      if (connectionType === 'DSL') {
        plane.position.set(0.4, -0.3, 0);
      } else {
        plane.position.set(0.3, -0.3, 0);
      }
    }
  };

  const initImagePlane = (plane) => {
    plane.position.set(0, 0, 0);
    plane.scale.set(18, 12, 2);
  };

  const initImagePlane2 = (plane) => {
    plane.position.set(-0.05, 0.3, 0);
    plane.scale.set(19, 7, 2);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mindarThree = new MindARThree({
      container,
      imageTargetSrc: '/targets4.mind',
    });

    const { renderer, scene, camera, cssRenderer } = mindarThree;
    const anchor = mindarThree.addAnchor(0);
    const anchor2 = mindarThree.addAnchor(1);

    // Port Plane setup
    const portGeometry = new THREE.PlaneGeometry(0.1, 0.1);
    const portMaterial = new THREE.MeshBasicMaterial({
      color: 0xea0a8e,
      transparent: true,
      opacity: 0.5,
    });
    const portPlane = new THREE.Mesh(portGeometry, portMaterial);
    portPlaneRef.current = portPlane;
    portPlane.position.set(-0.38, -0.3, 0);
    anchor.group.add(portPlane);

    // Image Plane setup
    const imageGeometry = new THREE.PlaneGeometry(0.1, 0.1);
    const imageTexture = new THREE.TextureLoader().load('/modemback.png');
    const imageMaterial = new THREE.MeshBasicMaterial({
      map: imageTexture,
      transparent: true, // Enable transparency
      alphaTest: 0.2, // Set an alpha threshold
    });
    const imagePlane = new THREE.Mesh(imageGeometry, imageMaterial);
    imagePlaneRef.current = imagePlane;
    anchor.group.add(imagePlane);

    const imageGeometry2 = new THREE.PlaneGeometry(0.1, 0.1);
    const imageTexture2 = new THREE.TextureLoader().load('/modemfrontsm.png');
    const imageMaterial2 = new THREE.MeshBasicMaterial({
      map: imageTexture2,
      transparent: true, // Enable transparency
      alphaTest: 0.2, // Set an alpha threshold
    });
    const imagePlane2 = new THREE.Mesh(imageGeometry2, imageMaterial2);
    imagePlaneRef2.current = imagePlane2;
    anchor2.group.add(imagePlane2);

    initPortPlane(portPlaneRef.current, 0); // Initialize port plane (hidden)
    initImagePlane(imagePlaneRef.current);
    initImagePlane2(imagePlaneRef2.current);

    const loader = new GLTFLoader();
    loader.load('/arrow.glb', (gltf) => {
      const arrow = gltf.scene.children[0]; // Assumes arrow is the first object in your GLTF
      arrow.position.set(0, 0.05, 0); // Adjust position as needed
      arrow.scale.set(0.05, 0.05, 0.05); // Adjust scale as needed
      arrow.material = portMaterial; //
      portPlaneRef.current.add(arrow);

      const animationClip = gltf.animations[0];

      // Create a mixer
      const mixer = new THREE.AnimationMixer(arrow);
      const animationAction = mixer.clipAction(animationClip);
      animationAction.play(); // Start the animation
    });

    mindarThree.start().then(() => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
      setInitialized(true);
    });

    return () => {
      if (renderer) renderer.setAnimationLoop(null);
      if (mindarThree) {
        mindarThree.stop();
        renderer.dispose();
      }
      const elements = document.querySelectorAll('.mindar-ui-overlay');
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
      setInitialized(false);
      console.log('ARViewer cleanup: stopped rendering and MindAR.');
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;

    portPlaneRef.current.visible = currentStep === 2 || currentStep === 3;
    if (portPlaneRef.current.children.length > 0) {
      portPlaneRef.current.children[0].visible = portPlaneRef.current.visible;
    }

    imagePlaneRef.current.visible = currentStep === 0;
    imagePlaneRef2.current.visible = currentStep === 1;
  }, [currentStep, initialized]);

  const handlePreviousClick = () => {
    if (currentStep === 0) {
      // Redirect when at step 0
      window.location.href = '/#page=connectionInfo&connection=' + connectionType;
      window.location.reload();
    } else {
      // Standard 'previous' behavior for other steps
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) {
        initPortPlane(portPlaneRef.current, currentStep - 1);
      }
    }
  };

  const handleNextClick = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);

      if (currentStep === 2) {
        initPortPlane(portPlaneRef.current, currentStep + 1);
      } else if (currentStep === 3) {
        window.location.href = '/#page=yolo7modem&connection=' + connectionType; // Replace as needed
      }
    }
  };

  return {
    containerRef,
    initialized,
    setInitialized,
    currentStep,
    setCurrentStep,
    portPlaneRef,
    imagePlaneRef,
    imagePlaneRef2,
    handlePreviousClick,
    handleNextClick,
  };
};
