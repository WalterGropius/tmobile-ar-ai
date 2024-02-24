import React, { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

const ARViewer = () => {
  const containerRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const connectionType = new URLSearchParams(window.location.hash.replace('#', '')).get('connection');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return; 
    }

    const mindarThree = new MindARThree({
      container,
      imageTargetSrc: "/targets2.mind"
    });

    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);

    const geometry = new THREE.PlaneGeometry(0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
    const plane = new THREE.Mesh(geometry, material);

    if (connectionType === 'DSL') {
      plane.position.set(0.4, -0.3, 0);
    } else if (connectionType === 'POW') {
      plane.position.set(-0.38, -0.3, 0);
    } else {
      plane.position.set(0.3, -0.3, 0);
    }

    anchor.group.add(plane);

    mindarThree.start().then(() => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
      setInitialized(true); 
    });

    return () => {
      if (renderer) renderer.setAnimationLoop(null);
      if (mindarThree) mindarThree.stop();
      setInitialized(false); // Reset initialization flag.
      console.log("ARViewer cleanup: stopped rendering and MindAR.");
    };
  }, []); 

  return (
    <div>
      <h1>AR detekce</h1>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default ARViewer;
