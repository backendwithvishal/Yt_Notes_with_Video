import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DistortedKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.18;
    meshRef.current.rotation.y = time * 0.22;
    meshRef.current.rotation.z = Math.sin(time * 0.15) * 0.2;

    // Mouse parallax lerp
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    meshRef.current.rotation.x += THREE.MathUtils.lerp(0, targetY, 0.04);
    meshRef.current.rotation.y += THREE.MathUtils.lerp(0, targetX, 0.04);
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.4}>
        <torusKnotGeometry args={[1, 0.32, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#7C5CFC"
          emissive="#3B1C99"
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.85}
          distort={0.35}
          speed={1.8}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={3} rotationIntensity={1} floatIntensity={1.2}>
        <mesh position={[-2.4, 1.2, -1]} scale={0.45}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4ADEDE"
            emissive="#14B8C4"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[2.4, -1.1, -1.2]} scale={0.4}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#FFB454"
            emissive="#E8973C"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-4, -3, 2]} color="#4ADEDE" intensity={2} />
        <pointLight position={[4, 3, -2]} color="#B98BFF" intensity={2.5} />
        <pointLight position={[0, -2, 3]} color="#FFB454" intensity={1.2} />
        <DistortedKnot />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
