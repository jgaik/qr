import { Button } from "@yamori-design/react-components";
import { useMatchElementSize } from "@yamori-shared/react-utilities";
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ComponentRef,
} from "react";

function mapVideoPointToCanvas(
  point: DOMPointReadOnly,
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) {
  const rect = canvas.getBoundingClientRect();

  const vw = video.videoWidth;
  const vh = video.videoHeight;

  const cw = rect.width;
  const ch = rect.height;

  const videoAspect = vw / vh;
  const canvasAspect = cw / ch;

  let scale: number;
  let offsetX = 0;
  let offsetY = 0;

  if (videoAspect > canvasAspect) {
    // video is wider → crop left/right
    scale = ch / vh;
    offsetX = (cw - vw * scale) / 2;
  } else {
    // video is taller → crop top/bottom
    scale = cw / vw;
    offsetY = (ch - vh * scale) / 2;
  }

  return {
    x: point.x * scale + offsetX,
    y: point.y * scale + offsetY,
  };
}

export const CopyQrView = () => {
  const videoRef = useRef<ComponentRef<"video">>(null);
  const canvasRef = useRef<ComponentRef<"canvas">>(null);

  useMatchElementSize(videoRef, canvasRef);

  const detectorRef = useRef(new BarcodeDetector({ formats: ["qr_code"] }));

  const [detectedValue, setDetectedValue] = useState<string | null>(null);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const drawCorners = useCallback((points: DetectedBarcode["cornerPoints"]) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.lineWidth = 4;
    ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue(
      "--yamori-theme-primary"
    );

    ctx.beginPath();

    points?.forEach((point, index) => {
      const canvasPoint = mapVideoPointToCanvas(point, video, canvas);

      if (index === 0) ctx.moveTo(canvasPoint.x, canvasPoint.y);
      else ctx.lineTo(canvasPoint.x, canvasPoint.y);
    });

    ctx.closePath();
    ctx.stroke();
  }, []);

  const scan = useCallback(async () => {
    if (!videoRef.current) return;

    const barcodes = await detectorRef.current.detect(videoRef.current);

    if (barcodes.length > 0) {
      const qr = barcodes[0];

      if (qr.cornerPoints) {
        setDetectedValue(qr.rawValue);
        drawCorners(qr.cornerPoints);
      }
    } else {
      setDetectedValue(null);
      clearCanvas();
    }

    requestAnimationFrame(scan);
  }, [clearCanvas, drawCorners]);

  const stopCamera = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
  }, []);

  const startCamera = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    if (!videoRef.current) return;

    videoRef.current.srcObject = stream;
    await videoRef.current.play();

    scan();
  }, [scan]);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
      clearCanvas();
    };
  }, [startCamera, stopCamera, clearCanvas]);

  return (
    <main className="copy-qr-view">
      <video ref={videoRef} autoPlay muted playsInline />
      <canvas ref={canvasRef} />
      <Button disabled={!detectedValue} onClick={() => alert(detectedValue)}>
        Copy highlighted QR
      </Button>
    </main>
  );
};
