import { NavigationBarLayout } from "@yamori-design/react-components";
import { NavBarControls } from "./components";
import { useState } from "react";
import { CopyQrView, QrView } from "./views";
import "./app.css";

const IS_BARCODE_DETECTOR_SUPPORTED =
  "BarcodeDetector" in window &&
  "mediaDevices" in navigator &&
  typeof navigator.mediaDevices.getUserMedia === "function";

export const App = () => {
  const [showQr, setShowQr] = useState(true);

  return (
    <NavigationBarLayout
      githubHref="https://github.com/jgaik/qr"
      className="app"
      controls={showQr && <NavBarControls />}
      links={
        IS_BARCODE_DETECTOR_SUPPORTED
          ? [
              {
                children: showQr ? "Copy QR" : "Create QR",
                onClick: (e) => {
                  e.preventDefault();
                  setShowQr((prev) => !prev);
                },
                href: "#",
              },
            ]
          : undefined
      }
    >
      {showQr ? <QrView /> : <CopyQrView />}
    </NavigationBarLayout>
  );
};
