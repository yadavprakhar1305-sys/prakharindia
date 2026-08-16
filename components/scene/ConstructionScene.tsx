"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll";
import { useLang } from "@/app/LanguageProvider";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------------- Scroll-driven rig ---------------- */

function Rig() {
  useFrame(({ camera }, dt) => {
    const v = scrollStore.v;
    const isPortrait = (camera as THREE.PerspectiveCamera).aspect < 0.9;
    const px = lerp(0, isPortrait ? 4 : 7.5, smooth(v));
    const py = lerp(isPortrait ? 6.5 : 5.4, isPortrait ? 9.4 : 8.6, smooth(v));
    const z = isPortrait ? 22 : 17;
    const target = new THREE.Vector3(px, py, z);
    camera.position.lerp(target, 1 - Math.pow(0.001, dt));
    camera.lookAt(px * 0.55, 3.4, 0);
  });
  return null;
}

/* ---------------- Crane ---------------- */

function Crane() {
  const group = useRef<THREE.Group>(null!);
  const hook = useRef<THREE.Mesh>(null!);
  const cable = useRef<THREE.Mesh>(null!);
  const beacon = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const v = scrollStore.v;
    const lift = smooth(v * 7);
    group.current.rotation.y = Math.sin(t * 0.12) * 0.05;
    const hookY = lerp(2.2, 8.4, lift);
    hook.current.position.y = hookY;
    cable.current.scale.y = hookY - 0.6;
    cable.current.position.y = (9.6 + hookY) / 2 - 0.35;
    (beacon.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.6 + Math.sin(t * 6) * 1.2;
  });
  const cableMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#9aa6bd", roughness: 0.4 }), []);
  return (
    <group ref={group} position={[-11.5, 0, -3.2]}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.6, 0.4, 2.6]} />
        <meshStandardMaterial color="#ff6a1a" roughness={0.55} metalness={0.25} />
      </mesh>
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[0.55, 8.8, 0.55]} />
        <meshStandardMaterial color="#2e3a4e" roughness={0.5} metalness={0.55} />
      </mesh>
      <mesh position={[0.6, 9.7, 0]}>
        <boxGeometry args={[0.9, 0.8, 0.9]} />
        <meshStandardMaterial color="#1a2029" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[6.4, 9.95, 0]} rotation={[0, 0, -0.06]}>
        <boxGeometry args={[13.4, 0.42, 0.6]} />
        <meshStandardMaterial color="#ff6a1a" roughness={0.45} metalness={0.4} />
      </mesh>
      <mesh position={[-2.2, 9.95, 0]}>
        <boxGeometry args={[3, 0.42, 0.6]} />
        <meshStandardMaterial color="#2e3a4e" roughness={0.5} metalness={0.55} />
      </mesh>
      <mesh ref={cable} position={[12.6, 5, 0]}>
        <boxGeometry args={[0.05, 9, 0.05]} />
        <primitive object={cableMat} attach="material" />
      </mesh>
      <group ref={hook} position={[12.6, 2.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.26, 0.9, 10]} />
          <meshStandardMaterial color="#9aa6bd" roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.55, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.3, 0.4, 4]} />
          <meshStandardMaterial color="#ff6a1a" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>
      <mesh ref={beacon} position={[13.2, 10.3, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#ff4d4d" emissive="#ff4d4d" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

/* ---------------- Buildings ---------------- */

type BuildingDef = {
  key: string;
  x: number;
  floors: number;
  w: number;
  d: number;
  color: string;
  phase: [number, number];
  shed?: boolean;
};

const BUILDINGS: BuildingDef[] = [
  { key: "cap.res", x: -7, floors: 5, w: 4.6, d: 5, color: "#2e3a4e", phase: [0.14, 0.3] },
  { key: "cap.com", x: 0, floors: 8, w: 5.2, d: 6, color: "#33415c", phase: [0.3, 0.5] },
  { key: "cap.ind", x: 7.4, floors: 3, w: 6.8, d: 4.8, color: "#3a4353", phase: [0.5, 0.66], shed: true },
];

const FLOOR_H = 1.15;

function Building({ def, label }: { def: BuildingDef; label: string }) {
  const floors = useRef<THREE.Mesh[]>([]);
  const wires = useRef<THREE.Mesh[]>([]);
  const roof = useRef<THREE.Mesh>(null!);
  const roofWire = useRef<THREE.Mesh>(null!);
  const heightRef = useRef(0);

  useFrame(() => {
    const v = scrollStore.v;
    const local = smooth((v - def.phase[0]) / (def.phase[1] - def.phase[0]));
    const n = def.floors;
    for (let i = 0; i < n; i++) {
      const reveal = clamp01((local * n - (i + 0.45)) * 2.6);
      const mesh = floors.current[i];
      const wire = wires.current[i];
      if (!mesh || !wire) continue;
      const y = (i + 0.5) * FLOOR_H * reveal - (FLOOR_H / 2) * (1 - reveal);
      mesh.scale.y = Math.max(0.001, reveal);
      mesh.position.y = y;
      wire.scale.copy(mesh.scale);
      wire.position.y = y;
      (wire.material as THREE.MeshBasicMaterial).opacity = 0.32 * (1 - reveal);
    }
    if (roof.current && roofWire.current) {
      const roofReveal = clamp01((local * n - (n - 0.15)) * 3);
      const roofY = n * FLOOR_H * smooth(local) + 0.5 * roofReveal - 0.18;
      roof.current.position.y = roofY;
      roof.current.scale.setScalar(Math.max(0.001, roofReveal));
      roofWire.current.position.copy(roof.current.position);
      roofWire.current.scale.copy(roof.current.scale);
      (roofWire.current.material as THREE.MeshBasicMaterial).opacity = 0.32 * (1 - roofReveal);
    }
    heightRef.current = n * FLOOR_H * smooth(local);
  });

  const floorsArr = useMemo(() => Array.from({ length: def.floors }, (_, i) => i), [def.floors]);

  return (
    <group position={[def.x, 0, 0]}>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[def.w + 0.7, 0.16, def.d + 0.7]} />
        <meshStandardMaterial color="#1f2733" roughness={0.8} />
      </mesh>
      {floorsArr.map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) floors.current[i] = el;
          }}
          position={[0, (i + 0.5) * FLOOR_H, 0]}
        >
          <boxGeometry args={[def.w, FLOOR_H, def.d]} />
          <meshStandardMaterial color={def.color} roughness={0.45} metalness={0.35} />
        </mesh>
      ))}
      {floorsArr.map((i) => (
        <mesh
          key={`w${i}`}
          ref={(el) => {
            if (el) wires.current[i] = el;
          }}
          position={[0, (i + 0.5) * FLOOR_H, 0]}
        >
          <boxGeometry args={[def.w, FLOOR_H, def.d]} />
          <meshBasicMaterial color="#4a9eff" wireframe transparent opacity={0.32} />
        </mesh>
      ))}
      {def.shed ? (
        <>
          <mesh ref={roof} position={[0, def.floors * FLOOR_H, 0]}>
            <boxGeometry args={[def.w + 1.4, 0.35, def.d]} />
            <meshStandardMaterial color="#ff6a1a" roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh ref={roofWire} position={[0, def.floors * FLOOR_H, 0]}>
            <boxGeometry args={[def.w + 1.4, 0.35, def.d]} />
            <meshBasicMaterial color="#4a9eff" wireframe transparent opacity={0.32} />
          </mesh>
        </>
      ) : (
        <>
          <mesh ref={roof} position={[0, def.floors * FLOOR_H, 0]}>
            <coneGeometry args={[Math.max(def.w, def.d) * 0.62, 1.1, 4]} />
            <meshStandardMaterial color="#ff6a1a" roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh ref={roofWire} position={[0, def.floors * FLOOR_H, 0]}>
            <coneGeometry args={[Math.max(def.w, def.d) * 0.62, 1.1, 4]} />
            <meshBasicMaterial color="#4a9eff" wireframe transparent opacity={0.32} />
          </mesh>
        </>
      )}
      <BuildingLabel def={def} label={label} heightRef={heightRef} />
    </group>
  );
}

function BuildingLabel({
  def,
  label,
  heightRef,
}: {
  def: BuildingDef;
  label: string;
  heightRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null!);
  const { lang } = useLang();
  useFrame(() => {
    group.current.position.y = heightRef.current + 1.6;
  });
  return (
    <group ref={group} position={[0, 1.6, 0]}>
      <Html center distanceFactor={16} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#f4f6f8",
            background: "rgba(12,14,18,0.72)",
            border: "1px solid rgba(255,106,26,0.55)",
            padding: "4px 10px",
            borderRadius: 3,
            whiteSpace: "nowrap",
            textShadow: "0 0 12px rgba(255,106,26,0.6)",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

/* ---------------- Site floor outline ---------------- */

function SiteOutline() {
  const pts = useMemo(
    () =>
      [
        new THREE.Vector3(-9.5, 0.02, -3.4),
        new THREE.Vector3(9.5, 0.02, -3.4),
        new THREE.Vector3(9.5, 0.02, 3.4),
        new THREE.Vector3(-9.5, 0.02, 3.4),
        new THREE.Vector3(-9.5, 0.02, -3.4),
      ],
    []
  );
  return (
    <group>
      <Line points={pts} color="#4a9eff" lineWidth={1} transparent opacity={0.45} />
      <Line
        points={[
          new THREE.Vector3(-12.8, 0.02, -3.2),
          new THREE.Vector3(-10.2, 0.02, -3.2),
        ]}
        color="#ff6a1a"
        lineWidth={1}
        transparent
        opacity={0.7}
      />
    </group>
  );
}

/* ---------------- Grid floor ---------------- */

function Floors() {
  const bp = useRef<THREE.Group>(null!);
  const solid = useRef<THREE.Group>(null!);
  useFrame(() => {
    const v = scrollStore.v;
    const fade = smooth(v * 5);
    bp.current.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.Material & { opacity: number };
      m.opacity = 0.85 * (1 - fade);
    });
    solid.current.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.Material & { opacity: number };
      m.opacity = 0.9 * fade;
    });
  });
  const gridArgs = useMemo(() => (["#4a9eff", "#1f2733"] as const), []);
  return (
    <>
      <group ref={bp} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <gridHelper args={[26, 26, gridArgs[0]]} />
      </group>
      <group ref={solid} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <gridHelper args={[26, 26, "#2e3a4e", "#1a2029"]} />
      </group>
    </>
  );
}

/* ---------------- Manpower force-field nodes (BG accents) ---------------- */

const NODE_DEFS: { x: number; z: number; c: string }[] = [];
for (let i = 0; i < 40; i++) {
  NODE_DEFS.push({
    x: -7 + ((i % 10) / 9) * 14,
    z: -2.6 + (Math.floor(i / 10) / 3) * 5.4,
    c: i % 4 === 0 ? "#ff6a1a" : "#4a9eff",
  });
}

function FieldNodes() {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const m = child as THREE.Mesh;
      const s = 0.09 + 0.02 * Math.sin(t * 2 + i * 1.7);
      m.scale.setScalar(s);
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.4 + 0.8 * Math.sin(t * 2.4 + i);
    });
  });
  return (
    <group ref={group} position={[0, 0.06, 0]}>
      {NODE_DEFS.map((n, i) => (
        <mesh key={i} position={[n.x, 0, n.z]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color={n.c} emissive={n.c} emissiveIntensity={1.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Skyscraper/3D Scene ---------------- */

function SceneInner() {
  const { t } = useLang();
  return (
    <>
      <color attach="background" args={["#0c0e12"]} />
      <fog attach="fog" args={["#0c0e12", 22, 40]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[14, 22, 8]} intensity={1.9} color="#e8eef8" />
      <directionalLight position={[-12, 10, -8]} intensity={0.5} color="#4a9eff" />
      <pointLight position={[-11, 9, -2]} intensity={26} color="#ff6a1a" distance={16} />
      <Rig />
      <Floors />
      <SiteOutline />
      <Crane />
      {BUILDINGS.map((b) => (
        <Building key={b.key} def={b} label={t(b.key)} />
      ))}
      <FieldNodes />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={24} blur={2.4} far={3.2} color="#000000" />
    </>
  );
}

export default function ConstructionScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 5.4, 17], fov: 46 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <SceneInner />
    </Canvas>
  );
}