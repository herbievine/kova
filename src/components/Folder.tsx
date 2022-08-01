import { Folder } from "@prisma/client";
import type React from "react";
import colors from "../lib/colors";

interface FolderProps {
  folder: Folder;
}

const Folder: React.FC<FolderProps> = ({ folder: { name, color } }) => {
  return (
    <div
      className="w-full py-2 px-4 flex justify-between items-center rounded"
      // TODO: map correct color
      style={{ backgroundColor: color }}
    >
      <a>{name}</a>
    </div>
  );
};

export default Folder;
