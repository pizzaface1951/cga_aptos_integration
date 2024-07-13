import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }) {
  const [model, setModel] = useState(null);
  const gltf = useGLTF(url);
  const { scene } = gltf;
  scene.position.y = -.85;
  scene.position.z = 0;

  useEffect(() => {
    setModel(scene);
  }, [url, scene]);

  return model ? <primitive object={model} /> : null;
}

const ModelViewer = ({ modelUrl, backgroundColor }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas style={{ backgroundColor }} pixelRatio={[1, 2]} camera={{ fov: 22 }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;

