import { useEffect, useRef, useState } from 'react';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { ConnectionType } from '../types/connection';
// @ts-ignore
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

type PlaneRef = THREE.Mesh<THREE.PlaneGeometry, THREE.Material | THREE.Material[]>;

type NullablePlaneRef = PlaneRef | null;

export const useAR = (connectionType: ConnectionType) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const portPlaneRef = useRef<NullablePlaneRef>(null);
  const imagePlaneRefFront = useRef<NullablePlaneRef>(null);
  const imagePlaneRefBack = useRef<NullablePlaneRef>(null);

  const initPortPlane = (plane: PlaneRef, step: number) => {
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

  const initImagePlane = (plane: PlaneRef) => {
    plane.position.set(0, 0, 0);
    plane.scale.set(18, 12, 2);
  };

  const initImagePlane2 = (plane: PlaneRef) => {
    plane.position.set(-0.05, 0.3, 0);
    plane.scale.set(19, 7, 2);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mindarThree = new MindARThree({ container, imageTargetSrc: '/targets4.mind' });

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
    const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true, alphaTest: 0.2 });
    const imagePlane = new THREE.Mesh(imageGeometry, imageMaterial);
    imagePlaneRefFront.current = imagePlane;
    anchor.group.add(imagePlane);

    const imageGeometry2 = new THREE.PlaneGeometry(0.1, 0.1);
    const imageTexture2 = new THREE.TextureLoader().load('/modemfrontsm.png');
    const imageMaterial2 = new THREE.MeshBasicMaterial({ map: imageTexture2, transparent: true, alphaTest: 0.2 });
    const imagePlane2 = new THREE.Mesh(imageGeometry2, imageMaterial2);
    imagePlaneRefBack.current = imagePlane2;
    anchor2.group.add(imagePlane2);

    initPortPlane(portPlaneRef.current as PlaneRef, 0); // Initialize port plane (hidden)
    initImagePlane(imagePlaneRefFront.current as PlaneRef);
    initImagePlane2(imagePlaneRefBack.current as PlaneRef);

    const loader = new GLTFLoader();
    loader.load('/arrow.glb', (gltf: GLTF) => {
      const arrow = gltf.scene.children[0] as THREE.Mesh; // Assumes arrow is the first object in your GLTF
      arrow.position.set(0, 0.05, 0); // Adjust position as needed
      arrow.scale.set(0.05, 0.05, 0.05); // Adjust scale as needed
      arrow.material = portMaterial; //
      (portPlaneRef.current as PlaneRef).add(arrow);

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
      elements.forEach((element) => element.remove());
      setInitialized(false);
      console.log('ARViewer cleanup: stopped rendering and MindAR.');
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (portPlaneRef.current) {
      portPlaneRef.current.visible = currentStep === 2 || currentStep === 3;
      if (portPlaneRef.current.children.length > 0) {
        portPlaneRef.current.children[0].visible = portPlaneRef.current.visible;
      }
    }
    if (imagePlaneRefFront.current) {
      imagePlaneRefFront.current.visible = currentStep === 0;
    }
    if (imagePlaneRefBack.current) {
      imagePlaneRefBack.current.visible = currentStep === 1;
    }
  }, [currentStep, initialized]);

  const handlePreviousClick = () => {
    if (currentStep === 0) {
      // Redirect when at step 0
      window.location.href = `/#/connection-info?connection=${connectionType}`;
      window.location.reload();
    } else {
      // Standard 'previous' behavior for other steps
      setCurrentStep(currentStep - 1);
      if (currentStep === 3 && portPlaneRef.current) {
        initPortPlane(portPlaneRef.current as PlaneRef, currentStep - 1);
      }
    }
  };

  const handleNextClick = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 2 && portPlaneRef.current) {
        initPortPlane(portPlaneRef.current as PlaneRef, currentStep + 1);
      } else if (currentStep === 3) {
        window.location.href = `/#/yolo-7-modem?connection=${connectionType}`;
      }
    }
  };

  return { containerRef, currentStep, handlePreviousClick, handleNextClick };
};
