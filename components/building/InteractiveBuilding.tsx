"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll";

export type Phase = "foundation" | "structure" | "roof";
export type Mode = "auto" | Phase;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};

const FLOORS = 6; // G+5
const FH = 0.78;
const GW = 3.1;
const GD = 2.7;

function SyncProgress({
  mode,
  progressRef,
}: {
  mode: Mode;
  progressRef: React.MutableRefObject<number>;
}) {
  const localRef = useRef(0);
  useFrame((_, dt) => {
    const target =
      mode === "auto"
        ? (scrollStore.v - 0.14) / 0.52
        : mode === "foundation"
        ? 0.36
        : mode === "structure"
        ? 0.7
        : 1;
    const k = 1 - Math.pow(0.0005, dt);
    localRef.current += (clamp01(target) - localRef.current) * k;
    progressRef.current = localRef.current;
  });
  return null;
}

function BuildingModel({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const base = useRef<THREE.Mesh>(null!);
  const slabs = useRef<THREE.Mesh[]>([]);
  const slabsW = useRef<THREE.Mesh[]>([]);
  const wins = useRef<THREE.Mesh[]>([]);
  const roof = useRef<THREE.Mesh>(null!);
  const roofW = useRef<THREE.Mesh>(null!);

  const mats = useMemo(
    () => ({
      base: new THREE.MeshStandardMaterial({ color: "#7c828c", roughness: 0.9, metalness: 0.1 }),
      slab: new THREE.MeshStandardMaterial({ color: "#8f959f", roughness: 0.8, metalness: 0.12 }),
      steel: new THREE.MeshStandardMaterial({ color: "#7a4a26", roughness: 0.55, metalness: 0.45 }),
      glass: new THREE.MeshStandardMaterial({ color: "#4a9eff", roughness: 0.3, metalness: 0.6 }),
      tile: new THREE.MeshStandardMaterial({ color: "#b8452f", roughness: 0.6, metalness: 0.1 }),
      wire: new THREE.MeshBasicMaterial({ color: "#4a9eff", wireframe: true, transparent: true, opacity: 0.4 }),
    }),
    []
  );

  useFrame(() => {
    const local = progressRef.current;
    const n = FLOORS;

    for (let i = 0; i < n; i++) {
      const slabK = smooth(clamp01(local * n - i));
      slabs.current[i].scale.y = Math.max(0.001, slabK);
      slabs.current[i].position.y = (i + 0.5) * FH * slabK - (FH / 2) * (1 - slabK);
      slabsW.current[i].scale.copy(slabs.current[i].scale);
      slabsW.current[i].position.y = slabs.current[i].position.y;
      (slabsW.current[i].material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - slabK);
      wins.current[i].scale.y = Math.max(0.001, slabK);
      wins.current[i].position.y = slabs.current[i].position.y;
    }

    const roofK = smooth(clamp01((local - 0.85) / 0.15));
    roof.current.position.y = n * FH * smooth(local) + 0.25 + 0.7 * (1 - roofK);
    roof.current.scale.y = Math.max(0.001, roofK * 0.001 + roofK);
    roofW.current.position.copy(roof.current.position);
    roofW.current.scale.copy(roof.current.scale);
    (roofW.current.material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - roofK);

    base.current.position.y = 0.16 * Math.max(0.001, smooth(local * 6));
  });

  return (
    <group>
      {/* Foundation: gray concrete */}
      <mesh ref={base} position={[0, 0.16, 0]}>
        <boxGeometry args={[GW + 0.5, 0.32, GD + 0.5]} />
        <primitive object={mats.base} attach="material" />
      </mesh>

      {/* Structure: brown steel slabs */}
      {Array.from({ length: FLOORS }, (_, i) => i).map((i) => (
        <mesh
          key={`s${i}`}
          ref={(el) => {
            if (el) slabs.current[i] = el;
          }}
          position={[0, (i + 0.5) * FH, 0]}
        >
          <boxGeometry args={[GW, FH - 0.08, GD]} />
          <primitive object={mats.steel} attach="material" />
        </mesh>
      ))}
      {Array.from({ length: FLOORS }, (_, i) => i).map((i) => (
        <mesh
          key={`sw${i}`}
          ref={(el) => {
            if (el) slabsW.current[i] = el;
          }}
          position={[0, (i + 0.5) * FH, 0]}
        >
          <boxGeometry args={[GW, FH - 0.08, GD]} />
          <primitive object={mats.wire} attach="material" />
        </mesh>
      ))}

      {/* Facade glass windows */}
      {Array.from({ length: FLOORS }, (_, i) => i).map((i) => (
        <mesh
          key={`w${i}`}
          ref={(el) => {
            if (el) wins.current[i] = el;
          }}
          position={[0, (i + 0.5) * FH, 0]}
        >
          <boxGeometry args={[GW * 0.55, 0.22, 0.02]} />
          <primitive object={mats.glass} attach="material" />
        </mesh>
      ))}

      {/* Roof: red tile pyramid */}
      <mesh ref={roof} position={[0, FLOORS * FH + 0.25, 0]}>
        <coneGeometry args={[GW * 0.62, 1.0, 4]} />
        <primitive object={mats.tile} attach="material" />
      </mesh>
      <mesh ref={roofW} position={[0, FLOORS * FH + 0.25, 0]}>
        <coneGeometry args={[GW * 0.62, 1.0, 4]} />
        <primitive object={mats.wire} attach="material" />
      </mesh>
    </group>
  );
}

export default function InteractiveBuilding({
  mode,
  bg = "radial-gradient(ellipse at 50% 100%, rgba(74,158,255,0.09), rgba(12,14,18,0.5))",
}: {
  mode: Mode;
  bg?: string;
}) {
  const progressRef = useRef(0);
  return (
    <div style={{ width: "100%", height: "100%", background: bg, borderRadius: 14 }}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [7.2, 4.8, 8.6], fov: 38 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 10, 5]} intensity={2.2} color="#e8eef8" />
        <pointLight position={[-6, 4, -4]} intensity={24} color="#ff6a1a" distance={16} />
        <SyncProgress mode={mode} progressRef={progressRef} />
        <BuildingModel progressRef={progressRef} />
        <OrbitControls
          enablePan={false}
          enableZoom
          enableRotate
          autoRotate
          autoRotateSpeed={0.7}
          minDistance={5}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </div>
  );
}