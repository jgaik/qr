import {
  Button,
  Dialog,
  NavigationBarLayout,
  useDialog,
} from "@yamori-design/react-components";
import {
  Controls,
  QrCode,
  SavedQrsDialogContent,
  TextInput,
} from "./components";
import { type ComponentRef, useRef } from "react";
import { useSavedQrs } from "./utilities";
import "./app.css";

export const App = () => {
  const qrCodeRef = useRef<ComponentRef<typeof QrCode> | null>(null);

  const { showDialog } = useDialog();

  const [savedQrs] = useSavedQrs();

  const isShowSavedEnabled = savedQrs && savedQrs.length > 0;

  return (
    <NavigationBarLayout
      githubHref="https://github.com/jgaik/qr"
      className="app"
      controls={
        isShowSavedEnabled && (
          <Button
            variant="text"
            onClick={() =>
              showDialog(<SavedQrsDialogContent />, {
                closeOnOutsideClick: true,
                header: <Dialog.Header withClose />,
                id: "saved-qrs-dialog",
              })
            }
          >
            Saved QRs
          </Button>
        )
      }
    >
      <TextInput />
      <QrCode ref={qrCodeRef} />
      <Controls onDownload={() => qrCodeRef.current?.download()} />
    </NavigationBarLayout>
  );
};
