"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** The site's signature material: clear glass with a thin-film (iridescent) coat. */
export function PrismMaterial({ tint = "#ffffff" }: { tint?: string }) {
  return (
    <meshPhysicalMaterial
      color={tint}
      transmission={1}
      thickness={1.4}
      roughness={0.06}
      ior={1.45}
      iridescence={1}
      iridescenceIOR={1.35}
      iridescenceThicknessRange={[120, 820]}
      clearcoat={1}
      clearcoatRoughness={0.05}
      attenuationColor="#e8f4ff"
      attenuationDistance={3}
      envMapIntensity={1.4}
    />
  );
}

/** Studio light built from coloured panels, so nothing is fetched over the network. */
export function PrismLights() {
  return (
    <>
      {/* Opaque fog behind the glass gives transmission something to refract. */}
      <color attach="background" args={["#e9ecf1"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#e9ecf1"]} />
        <Lightformer form="rect" intensity={4} color="#8fe3f3" position={[-5, 2, -2]} scale={[6, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={4} color="#ffc2e5" position={[5, -1, -1]} scale={[6, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={3} color="#c6b3ff" position={[0, 5, 2]} scale={4} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[0, 0, 6]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ccf7c0" position={[0, -5, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
      </Environment>
    </>
  );
}

type CubeSpec = { pos: [number, number, number]; size: number; rot: [number, number, number]; speed: number };

function Cube({ spec, still }: { spec: CubeSpec; still: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const spin = useRef(0);
  const hover = useRef(false);

  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    if (!still) {
      m.rotation.x += dt * 0.12 * spec.speed;
      m.rotation.y += dt * 0.18 * spec.speed;
    }
    if (spin.current > 0.001) {
      m.rotation.y += spin.current * dt;
      spin.current *= 0.94;
    }
    const target = hover.current ? 1.12 : 1;
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, target, 0.12));
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    spin.current += 9;
  };

  return (
    <Float enabled={!still} speed={1.2 * spec.speed} rotationIntensity={0.4} floatIntensity={0.9}>
      <RoundedBox
        ref={ref}
        args={[spec.size, spec.size, spec.size]}
        radius={spec.size * 0.12}
        smoothness={5}
        position={spec.pos}
        rotation={spec.rot}
        onClick={onClick}
        onPointerOver={(e) => { e.stopPropagation(); hover.current = true; document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { hover.current = false; document.body.style.cursor = ""; }}
      >
        <PrismMaterial />
      </RoundedBox>
    </Float>
  );
}

/** Whole field leans toward the pointer. */
function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ pointer }) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, pointer.x * 0.35, 0.05);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -pointer.y * 0.2, 0.05);
  });
  return <group ref={g}>{children}</group>;
}

export default function GlassCubes({ layout = "hero" }: { layout?: "hero" | "single" }) {
  const still = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const cubes: CubeSpec[] =
    layout === "single"
      ? [{ pos: [0, 0, 0], size: 2.4, rot: [0.5, 0.7, 0.1], speed: 0.6 }]
      : [
          { pos: [3.6, 1.2, -0.5], size: 1.5, rot: [0.4, 0.6, 0], speed: 0.8 },
          { pos: [5.4, -1.4, -2], size: 1.0, rot: [0.9, 0.2, 0.4], speed: 1.1 },
          { pos: [1.6, -2.2, 0.6], size: 0.8, rot: [0.2, 0.9, 0.3], speed: 1.3 },
          { pos: [6.2, 2.6, -3], size: 0.7, rot: [0.6, 0.1, 0.8], speed: 1 },
          { pos: [-1.2, 2.6, -2.5], size: 0.55, rot: [0.3, 0.5, 0.2], speed: 1.4 },
          { pos: [3.2, -0.2, 1.8], size: 0.45, rot: [0.7, 0.3, 0.6], speed: 1.6 },
          { pos: [-4.6, -2.4, -3], size: 0.9, rot: [0.1, 0.7, 0.5], speed: 0.9 },
        ];

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{ antialias: true }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <PrismLights />
      <Rig>
        {cubes.map((c, i) => (
          <Cube key={i} spec={c} still={still} />
        ))}
      </Rig>
    </Canvas>
  );
}
