import { CloseIcon } from "@yamori-design/icons";
import { Button, Textarea } from "@yamori-design/react-components";
import {
  getDebouncedFunction,
  useSearchParams,
} from "@yamori-shared/react-utilities";
import { useEffect, useMemo, useState } from "react";

export const TextInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams<"text" | "hide">();

  const [value, setValue] = useState(searchParams.text ?? "");

  const debouncedSet = useMemo(
    () => getDebouncedFunction(setSearchParams, 500),
    [setSearchParams]
  );

  useEffect(() => {
    debouncedSet((prev) => ({ ...prev, text: value }), {
      replace: true,
      dispatchEvent: true,
    });
  }, [debouncedSet, value]);

  return (
    !searchParams.hide && (
      <div className="text-input">
        <Textarea
          aria-label="Text to encode"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
          resizable
          rows={1}
          placeholder="Enter text to encode"
        />
        {value && (
          <Button
            variant="text"
            aria-label="Clear"
            onClick={() => setValue("")}
          >
            <CloseIcon />
          </Button>
        )}
      </div>
    )
  );
};
