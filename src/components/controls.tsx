import {
  useLocalStorage,
  useSearchParams,
} from "@yamori-shared/react-utilities";
import { LocalStorageKeys } from "../constants";
import {
  DownloadIcon,
  PrintIcon,
  SaveIcon,
  ShareIcon,
} from "@yamori-design/icons";
import { ControlButton } from "./control-button";

type ControlsProps = {
  onDownload: () => void;
};

export const Controls: React.FC<ControlsProps> = ({ onDownload }) => {
  const [searchParams] = useSearchParams<"text">();
  const [savedTexts, setSavedTexts] = useLocalStorage<string[]>(
    LocalStorageKeys.Saved
  );

  const isCollapsed = true; // TODO

  return (
    <div className="controls">
      <ControlButton
        icon={<ShareIcon />}
        label="Share"
        onClick={() =>
          navigator.share({
            url: window.location.href,
          })
        }
        collapsed={isCollapsed}
      />
      <ControlButton
        icon={<PrintIcon />}
        label="Print"
        onClick={() => window.print()}
        collapsed={isCollapsed}
      />
      <ControlButton
        icon={<DownloadIcon />}
        label="Download"
        onClick={onDownload}
        collapsed={isCollapsed}
      />
      <ControlButton
        icon={<SaveIcon />}
        label="Save"
        onClick={() =>
          setSavedTexts([...(savedTexts ?? []), searchParams.text!])
        }
        disabled={!searchParams.text || savedTexts?.includes(searchParams.text)}
        collapsed={isCollapsed}
      />
    </div>
  );
};
