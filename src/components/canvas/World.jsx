/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import React, { Suspense } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Loader from "../Loader";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const World = ({ isMobile }) => {
  const World = useLoader(GLTFLoader, "./models/stylized_planet.glb");
  const mixer = new THREE.AnimationMixer(World.scene);
  const clip = World.animations[3];
  const action = mixer.clipAction(clip);
  useFrame((_, delta) => mixer.update(delta));
  action.play();

  World.materials.Clouds.emissive = {
    r: 1,
    g: 1,
    b: 1,
    isColor: false,
  };

  World.materials.Clouds.emissiveIntensity = 1.5;
  World.materials.Clouds.toneMapped = false;

  return (
    <>
      <EffectComposer multisampling={1}>
        <Bloom intensity={1} luminanceThreshold={0.5} />
        <ambientLight intensity={0.5} />
        <primitive object={World.scene} scale={1.4} position={[0, 0, 0]} />
      </EffectComposer>
    </>
  );
};

const WorldCanvas = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 35, far: 200, near: 0.1 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{
        height: "90%",
      }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
        />
        <World />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default WorldCanvas;
