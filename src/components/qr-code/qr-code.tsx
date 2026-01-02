import { useSearchParams } from "@yamori-shared/react-utilities";
import { QrSvg } from "./qr-svg";
import type { ComponentRef, Ref } from "react";

type QrCodeProps = {
  ref?: Ref<ComponentRef<typeof QrSvg>>;
};

export const QrCode: React.FC<QrCodeProps> = ({ ref }) => {
  const [searchParams] = useSearchParams<"text">();

  return (
    <div className="qr-code">
      <QrSvg ref={ref} text={searchParams.text} />
    </div>
  );
};
