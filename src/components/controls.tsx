import { Button } from "@yamori-design/react-components";
import {
  useLocalStorage,
  useSearchParams,
} from "@yamori-shared/react-utilities";
import { LocalStorageKeys } from "../constants";

type ControlsProps = {
  onDownload: () => void;
};

export const Controls: React.FC<ControlsProps> = ({ onDownload }) => {
  const [searchParams] = useSearchParams<"text">();
  const [savedTexts, setSavedTexts] = useLocalStorage<string[]>(
    LocalStorageKeys.Saved
  );

  return (
    <div className="controls">
      <Button
        onClick={() =>
          navigator.share({
            url: window.location.href,
          })
        }
      >
        Share
      </Button>
      <Button onClick={() => window.print()}>Print</Button>
      <Button onClick={onDownload}>Download</Button>
      <Button
        onClick={() =>
          setSavedTexts([...(savedTexts ?? []), searchParams.text!])
        }
        disabled={!searchParams.text || savedTexts?.includes(searchParams.text)}
      >
        Save
      </Button>
    </div>
  );
};
