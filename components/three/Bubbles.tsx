"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/** BentoSMS: soft, squishy, toy-like blobs. Tap one and it bounces. */
function Blob({ pos, r, color }: { pos: [number, number, number]; r: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const kick = useRef(0);
  useFrame((_, dt) => {
    if (!ref.current) return;
    kick.current *= 0.9;
    const s = 1 + Math.sin(kick.current * 6) * kick.current * 0.25;
    ref.current.scale.set(s, 2 - s, s);
    ref.current.position.y = pos[1] + kick.current * 0.4;
    void dt;
  });
  return (
    <Float speed={2} floatIntensity={1.4} rotationIntensity={0.6}>
      <mesh
        ref={ref}
        position={pos}
        onClick={(e) => { e.stopPropagation(); kick.current = 1; }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        <sphereGeometry args={[r, 64, 64]} />
        <MeshDistortMaterial color={color} distort={0.32} speed={2.2} roughness={0.15} metalness={0} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
    </Float>
  );
}

export default function Bubbles() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 40 }} gl={{ alpha: true, antialias: true }} style={{ position: "absolute", inset: 0 }} aria-hidden>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 3, 5]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#e8fff0" position={[-4, -2, 2]} scale={[5, 5, 1]} />
      </Environment>
      <Blob pos={[2.1, 1.1, 0]} r={1.15} color="#D4FB84" />
      <Blob pos={[-2.4, -1.3, -0.5]} r={0.85} color="#004B3D" />
      <Blob pos={[0.2, -2.1, 0.8]} r={0.5} color="#ffffff" />
      <Blob pos={[-1.6, 1.9, -1]} r={0.42} color="#D4FB84" />
      <Blob pos={[3.1, -1.8, -1]} r={0.36} color="#ffffff" />
    </Canvas>
  );
}
