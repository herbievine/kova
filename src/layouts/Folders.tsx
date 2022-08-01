import type React from "react";
import type { Folder as FolderType } from "@prisma/client";
import Folder from "../components/Folder";
import Spacer from "../components/Spacer";

interface FoldersProps {
  folderTitle: string;
  folders: Omit<FolderType, "parentFolderId">[];
}

const Folders: React.FC<FoldersProps> = ({ folderTitle, folders }) => {
  return (
    <>
      {folders.length > 0 && (
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center">
            <h2 className="font-extrabold text-sm uppercase">{folderTitle}</h2>
          </div>
          <Spacer size={1.5} />
          <div className="flex flex-col space-y-4">
            {folders.map((folder, idx) => (
              <div key={idx} className="w-full">
                <Folder
                  key={idx}
                  folder={{ ...folder, parentFolderId: null }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Folders;
