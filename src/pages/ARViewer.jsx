import React, { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

const ARViewer = ({ connectionType }) => {
  const containerRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const portPlaneRef = useRef(null);
  const imagePlaneRef = useRef(null);
  const [h2Text, setH2Text] = useState('Namiřte na zadní stranu modemu'); // Initialize correctly

  const initPortPlane = (plane, step) => {
    if (step === 1) {
      plane.position.set(-0.38, -0.3, 0);
    } else if (step === 2) {
      if (connectionType === 'DSL') {
        plane.position.set(0.4, -0.3, 0);
      } else {
        plane.position.set(0.3, -0.3, 0);
      }
    }
  }

  const initImagePlane = (plane) => {
    plane.position.set(0, 0, 0);
    plane.scale.set(18, 12, 2);
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mindarThree = new MindARThree({
      container,
      imageTargetSrc: "/targets2.mind"
    });

    const { renderer, scene, camera, cssRenderer } = mindarThree;
    const anchor = mindarThree.addAnchor(0);

    // Port Plane setup
    const portGeometry = new THREE.PlaneGeometry(0.1, 0.1);
    const portMaterial = new THREE.MeshBasicMaterial({ color: 0xea0a8e, transparent: true, opacity: 0.5 });
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
      alphaTest: 0.2 // Set an alpha threshold
    });
    const imagePlane = new THREE.Mesh(imageGeometry, imageMaterial);
    imagePlaneRef.current = imagePlane;
    anchor.group.add(imagePlane);

    initPortPlane(portPlaneRef.current, 0); // Initialize port plane (hidden)
    initImagePlane(imagePlaneRef.current);

    mindarThree.start().then(() => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
      setInitialized(true);
    });

    return () => {
      if (renderer) renderer.setAnimationLoop(null);
      if (mindarThree) {
        mindarThree.stop()
        renderer.dispose()
      };
      const elements = document.querySelectorAll(".mindar-ui-overlay");
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
      setInitialized(false);
      console.log("ARViewer cleanup: stopped rendering and MindAR.");
    };
  }, []); 

  useEffect(() => {
    if (!initialized) return;

    portPlaneRef.current.visible = (currentStep === 1 || currentStep === 2);
    imagePlaneRef.current.visible = (currentStep === 0);
  }, [currentStep, initialized]);

  const handleNextClick = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setH2Text(['Step 1: Locate the target image', 
                  'Zapojte zdrojový kabel do označené zdířky',  
                  'Zapojte kabel '+connectionType+' do označené zdířky'][currentStep + 1]); // Update h2Text
    }

    if (currentStep === 1) { 
      initPortPlane(portPlaneRef.current, currentStep + 1); 
    } else if (currentStep === 2) {
      window.location.href = "/#page=5&connection="+connectionType; // Replace as needed
    }
  }

  


return (
  <div>
    <h1>AR detekce</h1>
    <h2>{h2Text}</h2> 
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>
    {currentStep < 3 && (
      <footer>
      <button onClick={handleNextClick}>Next</button>
      <div class="info lists">  <ul class="list-1"> <li>1. ON/OFF:  zapnutí/vypnutí modemu</li>
          <li>2.RESET:  obnovení továrního nastavení</li>
          <li>3.POWER: napájecí zdroj</li> 
          <li>4.USB: USB port (např. externí disk)</li>
        </ul>
        <ul class="list-2">  <li>5.LAN1 – LAN4:  připojení koncového zařízení (např. k počítači, set-top boxu, televizi)</li>
          <li>6.WAN:  připojení k internetové zásuvce</li>
          <li>7.DSL:  připojení k telefonní zásuvce</li></ul><ul>
          <li>8.WIFI ON/OFF:  zapnutí/vypnutí Wi-Fi</li>
          <li>9.WPS:  spárování zařízení</li>
          <li>10.Údaje k modemu (administrace nebo Wi-Fi)</li>
          <li>11.Otvory  zavěšení modemu</li>
        </ul>
      </div>
    </footer>
    )} 
  </div>
);
};

export default ARViewer; 