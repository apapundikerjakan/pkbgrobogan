"use client";

import { useRef } from "react";
import { useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Create a star shape (5-pointed)
function createStarShape(outerR: number, innerR: number) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    if (i === 0) shape.moveTo(r * Math.cos(angle), r * Math.sin(angle));
    else shape.lineTo(r * Math.cos(angle), r * Math.sin(angle));
  }
  shape.closePath();
  return shape;
}

function StarMesh({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.08);
    }
  });

  const shape = useMemo(() => createStarShape(0.1, 0.04), []);
  const geo = useMemo(() => new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false }), [shape]);

  return (
    <mesh ref={meshRef} geometry={geo} position={position} scale={[scale, scale, scale]}>
      <meshBasicMaterial color="white" transparent opacity={0.7} />
    </mesh>
  );
}

export function Globe3D({ className }: { className?: string }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 1024;
      canvas.height = 512;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      setTexture(texture);
    };
    img.src = "/indo-map.png";
  }, []);

  if (!texture) return null;

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={1} />
      <SpinningGlobe texture={texture} />
    </Canvas>
  );
}

function SpinningGlobe({ texture }: { texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  // Scale UVs so texture covers only center portion (~50% width, ~70% height)
  const sphereGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.2, 48, 48);
    const uvAttr = geo.attributes.uv;
    for (let i = 0; i < uvAttr.count; i++) {
      const u = uvAttr.getX(i);
      const v = uvAttr.getY(i);
      uvAttr.setXY(i, 0.5 + (u - 0.5) * 0.5, 0.5 + (v - 0.5) * 0.7);
    }
    uvAttr.needsUpdate = true;
    return geo;
  }, []);

  const wireGeo = useMemo(() => new THREE.SphereGeometry(1.2, 48, 48), []);

  // 9 stars orbiting around the globe (like PKB logo)
  const starPositions = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        return [1.55 * Math.cos(angle), 1.55 * Math.sin(angle), 0] as [number, number, number];
      }),
    []
  );

  return (
    <group>
      {/* Main sphere with scaled texture */}
      <mesh ref={meshRef} geometry={sphereGeo}>
        <meshBasicMaterial map={texture} transparent opacity={0.55} depthWrite={false} />
      </mesh>
      {/* Wireframe */}
      <mesh geometry={wireGeo}>
        <meshBasicMaterial color="white" wireframe transparent opacity={0.08} />
      </mesh>
      {/* Equator ring */}
      <mesh>
        <torusGeometry args={[1.2, 0.006, 8, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} />
      </mesh>
      {/* Meridian rings */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.2, 0.004, 8, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.004, 8, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0.18} />
      </mesh>
      {/* 9 stars orbiting at equator */}
      {starPositions.map((pos, i) => (
        <StarMesh key={i} position={pos} scale={0.8 + (i % 3) * 0.15} />
      ))}
    </group>
  );
}
