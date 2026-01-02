export {};

declare global {
  type BarcodeFormat =
    | "aztec"
    | "code_128"
    | "code_39"
    | "code_93"
    | "codabar"
    | "data_matrix"
    | "ean_13"
    | "ean_8"
    | "itf"
    | "pdf417"
    | "qr_code"
    | "upc_a"
    | "upc_e"
    | "unknown";

  interface DetectedBarcode {
    readonly boundingBox?: DOMRectReadOnly;
    readonly cornerPoints?: ReadonlyArray<DOMPointReadOnly>;
    readonly format: BarcodeFormat;
    readonly rawValue: string;
  }

  interface BarcodeDetectorOptions {
    formats?: BarcodeFormat[];
  }

  interface BarcodeDetector {
    detect(source: ImageBitmapSource): Promise<DetectedBarcode[]>;
  }

  var BarcodeDetector: {
    prototype: BarcodeDetector;
    new (options?: BarcodeDetectorOptions): BarcodeDetector;
    getSupportedFormats(): Promise<BarcodeFormat[]>;
  };

  interface Window {
    BarcodeDetector: typeof BarcodeDetector;
  }
}
