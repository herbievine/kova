import * as React from "react";
import { SVGProps } from "react";

const FolderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <path d="M464 96H272l-64-64H48C21.5 32 0 53.5 0 80v80h512v-16c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V192H0v240z" />
  </svg>
);

export default FolderIcon;
