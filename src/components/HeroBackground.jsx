import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const RotatingGeometry = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 0]} />
      {/* 顏色改為溫潤的木質棕色 */}
      <meshStandardMaterial 
        color="#8C6A4F" 
        wireframe={true} 
        transparent={true} 
        opacity={0.4} 
      />
    </mesh>
  );
};

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <RotatingGeometry />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}