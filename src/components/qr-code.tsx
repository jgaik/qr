import { useSearchParams } from "@yamori-shared/react-utilities";
import { create } from "qrcode";
import { useEffect, useState } from "react";

type QrSvgInfo = {
  d: string;
  size: number;
};

function qrToPath(text: string): QrSvgInfo {
  const padding = 1;
  const qr = create(text, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  const data = qr.modules.data;

  let d = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (data[row * size + col]) {
        const x = col + padding;
        const y = row + padding;
        d += `M${x} ${y}h1v1h-1z`;
      }
    }
  }
  return { d, size: size + 2 * padding };
}

export const QrCode: React.FC = () => {
  const [searchParams] = useSearchParams<"text">();
  const [svgInfo, setSvgInfo] = useState(() =>
    qrToPath("https://jgaik.github.io")
  );

  useEffect(() => {
    setSvgInfo(qrToPath(searchParams.text || "https://jgaik.github.io"));
  }, [searchParams.text]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgInfo.size} ${svgInfo.size}`}
      preserveAspectRatio="xMidYMin meet"
      className="qr-code"
    >
      <rect width="100%" height="100%" fill="white" />
      <path d={svgInfo.d} fill="black" />
    </svg>
  );
};
