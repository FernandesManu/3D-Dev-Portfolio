import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Core() {
  const mesh = useRef();
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.28;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={mesh} rotation={[0.3, 0.2, 0]}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial color="#8ff0ce" emissive="#173d38" emissiveIntensity={1.5} roughness={0.2} metalness={0.65} wireframe />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial color="#ffb86b" emissive="#5c2814" emissiveIntensity={0.8} roughness={0.3} metalness={0.45} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#0a0c12"]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 4]} color="#8ff0ce" intensity={12} />
      <pointLight position={[-3, -2, 2]} color="#c8a8ff" intensity={8} />
      <Core />
      <Sparkles count={80} scale={5} size={1.5} speed={0.25} color="#d8d5ff" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  );
}
