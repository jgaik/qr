import { useRef, type ComponentRef } from "react";
import { Controls, QrCode, TextInput } from "../../components";

export const QrView = () => {
  const qrCodeRef = useRef<ComponentRef<typeof QrCode> | null>(null);

  return (
    <main className="qr-view">
      <TextInput />
      <QrCode ref={qrCodeRef} />
      <Controls onDownload={() => qrCodeRef.current?.download()} />
    </main>
  );
};
