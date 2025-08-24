import { NavigationBarLayout } from "@yamori-design/react-components";
import { Controls, QrCode, TextInput } from "./components";
import "./app.css";
import { type ComponentRef, useRef } from "react";

export const App = () => {
  const qrCodeRef = useRef<ComponentRef<typeof QrCode> | null>(null);

  return (
    <NavigationBarLayout
      githubHref="https://github.com/jgaik/qr"
      className="app"
    >
      <TextInput />
      <QrCode ref={qrCodeRef} />
      <Controls onDownload={() => qrCodeRef.current?.download()} />
    </NavigationBarLayout>
  );
};
