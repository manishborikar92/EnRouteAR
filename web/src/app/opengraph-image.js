import { ImageResponse } from "next/og";

export const alt = "EnRouteAR — The real world. A clearer way.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  // ImageResponse renders outside the browser; its built-in `tw` support avoids a separate stylesheet.
  return new ImageResponse(<div tw="flex h-full w-full flex-col justify-between bg-[#172d29] p-20 text-[#f5f4ee]"><div tw="flex text-3xl">EnRoute<span tw="text-[#d7ef85]">AR</span></div><div tw="flex flex-col text-8xl font-bold tracking-tight"><span>The real world.</span><span tw="text-[#d7ef85]">A clearer way.</span></div><div tw="flex text-2xl text-[#b9cdc3]">Augmented reality. Live GPS. A fresh perspective.</div></div>, size);
}
