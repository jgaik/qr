import { useSearchParams } from "@yamori-shared/react-utilities";
import { create } from "qrcode";
import { useEffect, useState } from "react";

type QrSvgInfo = {
  d: string;
  size: number;
};

function qrToPath(text: string): QrSvgInfo {
  const qr = create(text, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  const data = qr.modules.data;

  let d = "";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        d += `M${c} ${r}h1v1h-1z`;
      }
    }
  }
  return { d, size };
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
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={svgInfo.d} fill="black" />
    </svg>
  );
};
