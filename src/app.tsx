import {
  Button,
  Dialog,
  NavigationBarLayout,
  Switch,
  Tooltip,
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
import { useSearchParams } from "@yamori-shared/react-utilities";

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams<"hide">();
  const qrCodeRef = useRef<ComponentRef<typeof QrCode> | null>(null);

  const { showDialog } = useDialog();

  const [savedQrs] = useSavedQrs();

  const isShowSavedEnabled = savedQrs && savedQrs.length > 0;

  return (
    <NavigationBarLayout
      githubHref="https://github.com/jgaik/qr"
      className="app"
      controls={[
        isShowSavedEnabled && (
          <Button
            key="saved-qrs"
            variant="secondary"
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
        ),
        <Tooltip content="Hide input" key="hide-input">
          <Switch
            checked={searchParams.hide === "true"}
            onChange={(e) => {
              setSearchParams(
                (prev) => ({
                  ...prev,
                  hide: e.currentTarget.checked ? "true" : null,
                }),
                { dispatchEvent: true }
              );
            }}
          />
        </Tooltip>,
      ]}
    >
      <TextInput />
      <QrCode ref={qrCodeRef} />
      <Controls onDownload={() => qrCodeRef.current?.download()} />
    </NavigationBarLayout>
  );
};
