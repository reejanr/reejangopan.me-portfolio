import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

const AnimatedIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={meshRef} args={[1.2, 1]} position={[2.8, 0.5, 0]}>
        <MeshDistortMaterial
          color="#22b8cf"
          attach="material"
          distort={0.25}
          speed={1.5}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </Icosahedron>
    </Float>
  );
};

const AnimatedTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <Torus ref={meshRef} args={[0.9, 0.2, 16, 32]} position={[-2.8, 1, -1]}>
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.2}
          metalness={0.95}
          transparent
          opacity={0.5}
        />
      </Torus>
    </Float>
  );
};

const ParticleSphere = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.8 + Math.random() * 0.3;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={600}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#22b8cf"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

const GlowingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.4, 32, 32]} position={[-1.5, -1.8, 0.5]}>
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={1}
        transparent
        opacity={0.5}
      />
    </Sphere>
  );
};

export const FloatingGeometry = () => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} color="#7c3aed" intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#22b8cf" intensity={0.3} />
        
        <AnimatedIcosahedron />
        <AnimatedTorus />
        <ParticleSphere />
        <GlowingSphere />
      </Canvas>
    </div>
  );
};
