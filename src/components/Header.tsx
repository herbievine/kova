import type React from "react";
import EllipsisIcon from "../assets/EllipsisIcon";
import PlusIcon from "../assets/PlusIcon";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="font-black text-3xl">{title}</h1>
      <div className="flex space-x-5">
        <PlusIcon width={30} />
        <EllipsisIcon width={30} />
      </div>
    </div>
  );
};

export default Header;
