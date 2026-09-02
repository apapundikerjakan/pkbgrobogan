"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion, useScroll, type MotionValue } from "framer-motion";

function Bee({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const wingL = useRef<THREE.Mesh>(null);
  const wingR = useRef<THREE.Mesh>(null);
  const pos = useRef(new THREE.Vector3(1.6, 1.8, 0));
  const prev = useRef(new THREE.Vector3(1.6, 1.8, 0));
  const face = useRef(1);
  const viewport = useThree((s) => s.viewport);
  const pointer = useThree((s) => s.pointer);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = progress.get();
    const vw = viewport.width;
    const vh = viewport.height;

    prev.current.copy(pos.current);

    const targetX =
      Math.sin(p * Math.PI * 3 + 1.2) * vw * 0.3 +
      pointer.x * vw * 0.05;
    const targetY = vh * 0.32 - p * vh * 0.95 + Math.sin(t * 2.1) * 0.16;

    pos.current.x += (targetX - pos.current.x) * (1 - Math.exp(-delta * 2.6));
    pos.current.y += (targetY - pos.current.y) * (1 - Math.exp(-delta * 2.6));
    g.position.copy(pos.current);

    const vx = pos.current.x - prev.current.x;
    const vy = pos.current.y - prev.current.y;
    const speed = Math.hypot(vx, vy) / Math.max(delta, 0.001);

    if (Math.abs(vx) > 0.0004) {
      face.current += (Math.sign(vx) - face.current) * (1 - Math.exp(-delta * 6));
    }
    g.scale.set(face.current, 1, 1);
    g.rotation.z = THREE.MathUtils.clamp(-vy * 14, -0.55, 0.55);
    g.rotation.y = Math.sin(t * 0.7) * 0.18;

    const flap = Math.sin(t * (30 + Math.min(speed, 4) * 9)) * 0.85;
    if (wingL.current) wingL.current.rotation.x = flap;
    if (wingR.current) wingR.current.rotation.x = -flap;
  });

  return (
    <group ref={group} position={[1.6, 1.8, 0]} scale={0.62}>
      {/* badan */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.5, 1, 6, 16]} />
        <meshStandardMaterial color="#f9a208" roughness={0.45} />
      </mesh>
      {/* belang */}
      {[-0.38, 0.02, 0.42].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1 - i * 0.08}>
          <torusGeometry args={[0.51, 0.075, 8, 24]} />
          <meshStandardMaterial color="#241609" roughness={0.6} />
        </mesh>
      ))}
      {/* kepala + mata + antena */}
      <mesh position={[0.98, 0.08, 0]}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <meshStandardMaterial color="#241609" roughness={0.5} />
      </mesh>
      {[0.2, -0.2].map((z) => (
        <mesh key={z} position={[1.26, 0.2, z]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
      {[0.16, -0.16].map((z, i) => (
        <group key={z} position={[1.05, 0.44, z]} rotation={[i === 0 ? -0.5 : 0.5, 0, -0.6]}>
          <mesh position={[0, 0.19, 0]}>
            <cylinderGeometry args={[0.018, 0.028, 0.38, 6]} />
            <meshStandardMaterial color="#241609" />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#ffbe2e" />
          </mesh>
        </group>
      ))}
      {/* sengat */}
      <mesh position={[-1.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.13, 0.42, 10]} />
        <meshStandardMaterial color="#241609" />
      </mesh>
      {/* sayap */}
      {([1, -1] as const).map((side) => (
        <group key={side} position={[-0.02, 0.44, side * 0.3]}>
          <mesh
            ref={side === 1 ? wingL : wingR}
            position={[0.12, 0, side * 0.52]}
            rotation={[Math.PI / 2.4, 0, -side * 0.25]}
            scale={[1.05, 0.05, 0.46]}
          >
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial
              color="#eaf7ff"
              transparent
              opacity={0.55}
              roughness={0.15}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function BeeScene() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 10], fov: 45 }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 6, 6]} intensity={1.5} />
        <pointLight position={[-6, -2, 4]} intensity={40} color="#ffd45c" />
        <Bee progress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
