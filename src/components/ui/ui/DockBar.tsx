"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import { Icons } from "@/utils/icons/icons";
import React from "react";


export type IconProps = React.HTMLAttributes<SVGElement>;

function DockBar() {
  return (
    <div className="relative">
      <Dock direction="middle">
        <DockIcon>
          <Icons.gitHub className="size-6" />
        </DockIcon>
        <DockIcon>
          <Icons.email className="size-6" />
        </DockIcon>
        <DockIcon>
          <Icons.linkedin className="size-6" />
        </DockIcon>
        <DockIcon>
          <Icons.leetcode className="size-6" />
        </DockIcon>
      </Dock>
    </div>
  );
}



export default DockBar;