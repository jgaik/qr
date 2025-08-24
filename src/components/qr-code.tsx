import { useSearchParams } from "@yamori-shared/react-utilities";
import { QrSvg } from "./qr-svg";

export const QrCode: React.FC = () => {
  const [searchParams] = useSearchParams<"text">();

  return <QrSvg text={searchParams.text} />;
};
