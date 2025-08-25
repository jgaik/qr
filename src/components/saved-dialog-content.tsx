import { Button, Link, List } from "@yamori-design/react-components";
import { useLocalStorage } from "@yamori-shared/react-utilities";
import { LocalStorageKeys } from "../constants";
import { MinusIcon } from "@yamori-design/icons";

export const SavedDialogContent: React.FC = () => {
  const [savedTexts, setSavedTexts] = useLocalStorage<string[]>(
    LocalStorageKeys.Saved
  );

  return (
    <List>
      {savedTexts?.map((text, index) => (
        <List.Item
          label={
            <>
              <Link
                href={`${location.pathname}?${new URLSearchParams({ text })}`}
              >
                {text}
              </Link>
              <Button
                variant="icon"
                onClick={() => setSavedTexts(savedTexts.toSpliced(index, 1))}
              >
                <MinusIcon />
              </Button>
            </>
          }
        />
      ))}
    </List>
  );
};
