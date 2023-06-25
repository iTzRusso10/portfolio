import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload } from "@react-three/drei";
import React, { Suspense, useState, useEffect } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ReactLogo = ({ isMobile }) => {
    const Robot = useLoader(GLTFLoader, './models/robot_playground.glb');
    
    const mixer = new THREE.AnimationMixer(Robot.scene);
    const clip = Robot.animations[0];
    const action = mixer.clipAction(clip);
    useFrame((_, delta) => mixer.update(delta));
    action.play();
    

    return (
        <EffectComposer multisampling={5}>
            <Bloom intensity={1.5} luminanceThreshold={1.5} />
            <mesh
                castShadow={true}
                receiveShadow={true}
            >
                <directionalLight castShadow >
                </directionalLight>

                <ambientLight intensity={1} />
                <hemisphereLight intensity={0.5} />
                <spotLight
                    intensity={0}
                    position={[0.5, 8, 0.5]}
                    penumbra={1}

                />
                <pointLight
                    castShadow={true}
                    intensity={5}
                    decay={2}
                    position={[0.5, 8, 0.5]}
                />
                <primitive
                    object={Robot.scene}
                    scale={1.2}
                    position={isMobile ? [0,-0.5, 0] : [0, -0.9, 0]}
                />
            </mesh>
        </EffectComposer>
    )
}

const RobotCanvas = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 640px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            shadows={true}
            dpr={[1, 2]}
            camera={{ fov: 45 }}
            gl={{ preserveDrawingBuffer: true }}
            style={{
                width: '100%',
            }}
        >
            <Suspense fallback={null}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    enablePan={false}
                />
                <ReactLogo isMobile={isMobile} />
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default RobotCanvas;
