import * as React from "react";
import { SVGProps } from "react";

const FileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" {...props}>
    <path d="M0 64C0 28.65 28.65 0 64 0h160v128c0 17.7 14.3 32 32 32h128v288c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V64zm256 64V0l128 128H256z" />
  </svg>
);

export default FileIcon;
