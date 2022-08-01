import type React from "react";

interface SpacerProps {
  size?: number;
}

const Spacer: React.FC<SpacerProps> = ({ size }) => {
  return <div style={{ padding: size ? `${size * 4}px` : "12px" }} />;
};

export default Spacer;
