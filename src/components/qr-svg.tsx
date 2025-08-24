import { create } from "qrcode";
import {
  type ComponentRef,
  useImperativeHandle,
  useMemo,
  useRef,
  type Ref,
  useEffect,
  useState,
} from "react";

type QrSvgInfo = {
  d: string;
  size: number;
};

function getSvgInfo(text: string): QrSvgInfo {
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

type QrSvgProps = {
  text?: string;
  ref?: Ref<{
    download: () => void;
  }>;
};

export const QrSvg: React.FC<QrSvgProps> = ({
  text = "https://jgaik.github.io/qr",
  ref,
}) => {
  const svgRef = useRef<ComponentRef<"svg">>(null);
  const downloadLinkRef = useRef<ComponentRef<"a">>(null);

  const [downloadLinkHref, setDownloadLinkHref] = useState<string>("");

  const svgInfo = useMemo(() => getSvgInfo(text), [text]);

  useEffect(() => {
    if (!svgRef.current) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    setDownloadLinkHref(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [svgInfo]);

  useImperativeHandle(ref, () => ({
    download: () => downloadLinkRef.current?.click(),
  }));

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svgInfo.size} ${svgInfo.size}`}
        className="qr-svg"
      >
        <rect width="100%" height="100%" fill="white" />
        <path d={svgInfo.d} fill="black" />
      </svg>
      <a
        href={downloadLinkHref}
        hidden
        ref={downloadLinkRef}
        download="qr.svg"
      />
    </>
  );
};
