import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Table } from './Table';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export const ThreeCanvas: React.FC = () => {
    return (
        <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 4, 10]} fov={40} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

                <Environment preset="city" />
                <SceneContent />
            </Canvas>
        </div>
    );
};

const SceneContent = () => {
    const tableGroup = useRef<THREE.Group>(null);
    const materialProps = useRef({
        wireframe: 1, // 1 is true, 0 is false
        opacity: 0,
        metalness: 0,
        roughness: 1,
        rotationY: 0,
        woodColorR: 248 / 255, woodColorG: 246 / 255, woodColorB: 242 / 255, // matches bg initially
        metalColorR: 207 / 255, metalColorG: 207 / 255, metalColorB: 207 / 255 // matches blueprint
    });

    useLayoutEffect(() => {
        // SCENE 2: The model fades in as wireframe
        gsap.to(materialProps.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: ".scene-2",
                start: "top bottom", // when top of scene-2 hits bottom of viewport
                end: "center center",
                scrub: true
            }
        });

        // SCENE 2 -> 3: Wireframe to Solid, gain materials
        gsap.to(materialProps.current, {
            wireframe: 0,
            opacity: 1,
            metalness: 0.8,
            roughness: 0.2,
            woodColorR: 217 / 255, woodColorG: 207 / 255, woodColorB: 193 / 255, // #D9CFC1
            metalColorR: 51 / 255, metalColorG: 51 / 255, metalColorB: 51 / 255, // #333333
            scrollTrigger: {
                trigger: ".scene-2",
                start: "center center",
                end: "bottom center",
                scrub: true
            }
        });

        // SCENE 3: Rotation and Environment interaction
        gsap.to(materialProps.current, {
            rotationY: Math.PI * 2,
            scrollTrigger: {
                trigger: ".scene-3",
                start: "top center",
                end: "bottom top",
                scrub: true
            }
        });

        // SCENE 4: Horizontal Walk - Move table to left
        gsap.to(tableGroup.current?.position || {}, {
            x: -5,
            scrollTrigger: {
                trigger: ".horizontal-section",
                start: "top center",
                end: "top top",
                scrub: true
            }
        });

    }, []);

    useFrame(() => {
        if (tableGroup.current) {
            tableGroup.current.rotation.y = materialProps.current.rotationY;

            tableGroup.current.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    if (mesh.material) {
                        const mat = mesh.material as THREE.MeshStandardMaterial;
                        mat.wireframe = materialProps.current.wireframe > 0.5;
                        mat.opacity = materialProps.current.opacity;
                        mat.transparent = true;

                        // Let's assume wood is roughness 0.4 and metal is 0.2
                        // Wood was [0, 1.5, 0] roughly based on Table.tsx
                        if (mesh.position.y > 1) { // It's a top
                            mat.color = new THREE.Color(materialProps.current.woodColorR, materialProps.current.woodColorG, materialProps.current.woodColorB);
                            mat.roughness = 0.4 + (1 - materialProps.current.roughness) * 0.6; // interpolate
                            mat.metalness = 0; // Wood is not metallic
                        } else { // It's a leg
                            mat.color = new THREE.Color(materialProps.current.metalColorR, materialProps.current.metalColorG, materialProps.current.metalColorB);
                            mat.roughness = materialProps.current.roughness;
                            mat.metalness = materialProps.current.metalness;
                        }
                        mat.needsUpdate = true;
                    }
                }
            });
        }
    });

    return (
        <group ref={tableGroup} position={[0, -1, 0]}>
            <Table />
        </group>
    );
};
