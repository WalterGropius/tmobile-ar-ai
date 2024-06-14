import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { ConnectionType } from '../types/connection';
// @ts-ignore
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import { Step } from '@/types/modelation';

type PlaneRef = THREE.Mesh<THREE.PlaneGeometry, THREE.Material | THREE.Material[]>;

type NullablePlaneRef = PlaneRef | null;


export const useAR = (connectionType: ConnectionType, step: Step) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [initialized, setInitialized] = useState(false);

  const portPlaneRef = useRef<NullablePlaneRef>(null);
  const arrowRef = useRef<NullablePlaneRef>(null);
  const imagePlaneRefFront = useRef<NullablePlaneRef>(null);
  const imagePlaneRefBack = useRef<NullablePlaneRef>(null);
  const powRef = useRef<NullablePlaneRef>(null);
  const cabRef = useRef<NullablePlaneRef>(null);

  const initPortPlane = (plane: PlaneRef) => {
    //power location
    plane.position.set(-0.38, -0.3, 0);
  };

  const setPortPlane = (plane: PlaneRef, connectionType: ConnectionType) => {
    //set location of port plane based on connection type
    const position = connectionType === 'DSL' ? { x: 0.4, y: -0.3, z: 0 } : { x: 0.3, y: -0.3, z: 0 };
    plane.position.set(position.x, position.y, position.z);
  };
  const initImagePlane = (plane: PlaneRef) => {
    plane.position.set(0, 0, 0);
    plane.scale.set(18, 12, 2);
  };

  const initImagePlane2 = (plane: PlaneRef) => {
    plane.position.set(-0.05, 0.2, 0);
    plane.scale.set(19, 7, 2);
  };

  const initializeAR = useMemo(() => {
    return () => {
      const container = containerRef.current;
      if (!container) return;
      //create mindarThree
      const mindarThree = new MindARThree({ container, imageTargetSrc: '/targets4.mind' });
      const { renderer, scene, camera, cssRenderer } = mindarThree;
      //creaete anchors
      const anchor = mindarThree.addAnchor(0);
      const anchor2 = mindarThree.addAnchor(1);

      //create port plane
      const portGeometry = new THREE.PlaneGeometry(0.1, 0.1);
      const portMaterial = new THREE.MeshBasicMaterial({
        color: 0xea0a8e,
        transparent: true,
        opacity: 0.5,
      });
    
      const portPlane = new THREE.Mesh(portGeometry, portMaterial);
      portPlaneRef.current = portPlane;
    
      initPortPlane(portPlane);
      anchor.group.add(portPlane);

      const createImagePlane = (texturePath: string) => {
        const geometry = new THREE.PlaneGeometry(0.1, 0.1);
        const texture = new THREE.TextureLoader().load(texturePath);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.2 });
        return new THREE.Mesh(geometry, material);
      };

      //create back image plane
      const imagePlane = createImagePlane('/modemback.png');
      imagePlaneRefBack.current = imagePlane;
      anchor.group.add(imagePlane);

      //create front image plane
      const imagePlane2 = createImagePlane('/modemfrontsm.png');
      imagePlaneRefFront.current = imagePlane2;
      anchor2.group.add(imagePlane2);
    
      initImagePlane(imagePlaneRefBack.current as PlaneRef);
      initImagePlane2(imagePlaneRefFront.current as PlaneRef);

      //load cables
      const loader = new GLTFLoader();
      loader.load('/cables.glb', (gltf: GLTF) => {
        const cab = gltf.scene.children[0] as THREE.Mesh;
        const pow = gltf.scene.children[1] as THREE.Mesh;
        cab.position.set(0, 0.05, 0); // Adjust position as needed
        cab.scale.set(0.05, 0.05, 0.05); // Adjust scale as needed
        pow.position.set(-0.38, -0.3, 0); // Adjust position as needed
        pow.scale.set(0.05, 0.05, 0.05); // Adjust scale as needed
        cab.material = portMaterial; // Ensure material is set
        pow.material = portMaterial; // Ensure material is set
        powRef.current = pow as PlaneRef;
        cabRef.current = cab as PlaneRef;
        (portPlaneRef.current as PlaneRef).add(cab);
        (portPlaneRef.current as PlaneRef).add(pow);
        cab.visible = false; // Initially hide cables
        pow.visible = false; // Initially hide cables
      });

      //start MindAR
      mindarThree.start().then(() => {
        //start animation loop
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
        setInitialized(true);
      });

      return { mindarThree, renderer };
    };
  }, []);



  const cleanupAR = useCallback((mindarThree, renderer) => {
    if (renderer) renderer.setAnimationLoop(null);
    if (mindarThree) {
      mindarThree.stop();
      renderer.dispose();
      console.log('ARViewer cleanup: stopped rendering and MindAR.');
    }
    const elements = document.querySelectorAll('.mindar-ui-overlay');
    elements.forEach((element) => element.remove());
    setInitialized(false);
    console.log('Cleanup complete.');
  }, []);


  useEffect(() => {
    const { mindarThree, renderer } = initializeAR();

    return () => {
      cleanupAR(mindarThree, renderer);
    };
  }, [initializeAR, cleanupAR]);

  useEffect(() => {
    if (!initialized) return;
  
    // Hide all elements initially
    if (portPlaneRef.current) portPlaneRef.current.visible = false;
    if (imagePlaneRefBack.current) imagePlaneRefBack.current.visible = false;
    if (imagePlaneRefFront.current) imagePlaneRefFront.current.visible = false;
    if (arrowRef.current) arrowRef.current.visible = false;
    if (powRef.current) powRef.current.visible = false;
    if (cabRef.current) cabRef.current.visible = false;
  
    // Show elements based on the current step
    switch (step) {
      case 'arBack':
        if (imagePlaneRefBack.current) imagePlaneRefBack.current.visible = true;
        break;
      case 'arFront':
        if (imagePlaneRefFront.current) imagePlaneRefFront.current.visible = true;
        break;
      case 'powerAnim':
        if (portPlaneRef.current) {
          portPlaneRef.current.position.set(-0.38, -0.3, 0);  
          portPlaneRef.current.visible = true;
        }
        if (powRef.current) powRef.current.visible = true;
        break;
      case 'cableAnim':
        const position = connectionType === 'DSL' ? { x: 0.4, y: -0.3, z: 0 } : { x: 0.3, y: -0.3, z: 0 };
        if (portPlaneRef.current) {
          portPlaneRef.current.position.set(position.x, position.y, position.z);
          portPlaneRef.current.visible = true; // Ensure port plane is visible
        }
        if (cabRef.current) cabRef.current.visible = true;
        break;
      default:
        break;
    }
  }, [step, initialized]);



  return { containerRef, setPortPlane };
};
