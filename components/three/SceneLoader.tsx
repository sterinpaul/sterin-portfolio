"use client";

import dynamic from "next/dynamic";

// WebGL only runs in the browser, so the scene is loaded client-side.
const ChromeScene = dynamic(() => import("./ChromeScene"), { ssr: false });

export default function SceneLoader() {
  return <ChromeScene />;
}
