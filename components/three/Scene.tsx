"use client";

import dynamic from "next/dynamic";

// WebGL only runs in the browser.
export const GlassCubes = dynamic(() => import("./GlassCubes"), { ssr: false });
export const Bubbles = dynamic(() => import("./Bubbles"), { ssr: false });
