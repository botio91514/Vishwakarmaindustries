import { useRef } from 'react';

interface TableProps {
  wireframe?: boolean;
  opacity?: number;
  woodColor?: string;
  metalColor?: string;
}

export const Table: React.FC<TableProps> = ({
  wireframe = false,
  opacity = 1,
  woodColor = "#D9CFC1",
  metalColor = "#333333"
}) => {
  const groupRef = useRef<any>(null);

  // You can rotate or animate the table group here if needed, 
  // but we will likely control it via GSAP.

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Table Top */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 2.5]} />
        <meshStandardMaterial
          color={woodColor}
          wireframe={wireframe}
          transparent={true}
          opacity={opacity}
          roughness={0.4}
        />
      </mesh>

      {/* Leg 1 */}
      <mesh position={[-1.8, 0.75, 1.05]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color={metalColor} wireframe={wireframe} transparent={true} opacity={opacity} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Leg 2 */}
      <mesh position={[1.8, 0.75, 1.05]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color={metalColor} wireframe={wireframe} transparent={true} opacity={opacity} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Leg 3 */}
      <mesh position={[-1.8, 0.75, -1.05]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color={metalColor} wireframe={wireframe} transparent={true} opacity={opacity} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Leg 4 */}
      <mesh position={[1.8, 0.75, -1.05]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color={metalColor} wireframe={wireframe} transparent={true} opacity={opacity} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};
