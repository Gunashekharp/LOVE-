'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function StarField() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(450);

    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 18;
      values[index + 1] = (Math.random() - 0.5) * 12;
      values[index + 2] = (Math.random() - 0.5) * 10;
    }

    return values;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.01;
      points.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.015;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f5c77e" size={0.016} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-65">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={1}>
        <StarField />
      </Canvas>
    </div>
  );
}
