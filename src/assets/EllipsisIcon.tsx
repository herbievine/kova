import * as React from "react";
import { SVGProps } from "react";

const EllipsisIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <path d="M120 256c0 30.9-25.07 56-56 56S8 286.9 8 256s25.07-56 56-56 56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56zm48 0c0-30.9 25.1-56 56-56s56 25.1 56 56-25.1 56-56 56-56-25.1-56-56z" />
  </svg>
);

export default EllipsisIcon;
