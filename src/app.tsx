import {
  Button,
  Dialog,
  NavigationBarLayout,
  useDialog,
} from "@yamori-design/react-components";
import { Controls, QrCode, SavedDialogContent, TextInput } from "./components";
import { type ComponentRef, useRef } from "react";
import { useLocalStorage } from "@yamori-shared/react-utilities";
import { LocalStorageKeys } from "./constants";
import "./app.css";

export const App = () => {
  const qrCodeRef = useRef<ComponentRef<typeof QrCode> | null>(null);

  const { showDialog } = useDialog();

  const [savedTexts] = useLocalStorage<string[]>(LocalStorageKeys.Saved);

  const isShowSavedEnabled = savedTexts && savedTexts.length > 0;

  return (
    <NavigationBarLayout
      githubHref="https://github.com/jgaik/qr"
      className="app"
      controls={
        isShowSavedEnabled && (
          <Button
            variant="text"
            onClick={() =>
              showDialog(<SavedDialogContent />, {
                closeOnOutsideClick: true,
                header: <Dialog.Header withClose />,
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
