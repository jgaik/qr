import {
  useDialog,
  Button,
  Dialog,
  Tooltip,
  Switch,
} from "@yamori-design/react-components";
import { useSearchParams } from "@yamori-shared/react-utilities";
import { useSavedQrs } from "../../utilities";
import { SavedQrsDialogContent } from "./saved-qrs-dialog-content";

export const NavBarControls = () => {
  const [searchParams, setSearchParams] = useSearchParams<"hide">();
  const { showDialog } = useDialog();

  const [savedQrs] = useSavedQrs();

  const isShowSavedEnabled = savedQrs && savedQrs.length > 0;
  return (
    <>
      {isShowSavedEnabled && (
        <Button
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
      )}
      <Tooltip content="Hide input">
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
      </Tooltip>
    </>
  );
};
