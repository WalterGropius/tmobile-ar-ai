import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

const ARViewer = ({ started }) => {
  const containerRef = useRef(null);
  const mindarThreeRef = useRef(null); // To hold the MindARThree instance

  useEffect(() => {
    if (started && containerRef.current) {
      const mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/targets2.mind"
      });
      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);
      const geometry = new THREE.PlaneGeometry(1, 0.55);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
      const plane = new THREE.Mesh(geometry, material);
      anchor.group.add(plane);

      mindarThreeRef.current = mindarThree; // Store the instance for later use

      mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    }

    return () => {
      if (mindarThreeRef.current) {
        const { renderer } = mindarThreeRef.current;
        renderer.setAnimationLoop(null);
        mindarThreeRef.current.stop();
        console.log("stopped rendering");
      }
    };
  }, [started]);

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>
  );
};

export default ARViewer;
