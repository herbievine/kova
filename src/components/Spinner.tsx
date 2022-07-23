import React from "react";

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <div className="h-5 w-5 border-4 rounded-full border-t-neutral-500 border-neutral-700 animate-spin"></div>
  );
};

export default Spinner;
