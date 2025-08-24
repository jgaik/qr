import { CloseIcon } from "@yamori-design/icons";
import { Button, Input } from "@yamori-design/react-components";
import {
  getDebouncedFunction,
  useSearchParams,
} from "@yamori-shared/react-utilities";
import { useEffect, useMemo, useState } from "react";

export const TextInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams<"text">();

  const [value, setValue] = useState(searchParams.text ?? "");

  const debouncedSet = useMemo(
    () => getDebouncedFunction(setSearchParams, 500),
    [setSearchParams]
  );

  useEffect(() => {
    debouncedSet({ text: value }, { replace: true, dispatchEvent: true });
  }, [debouncedSet, value]);

  return (
    <Input
      className="text-input"
      value={value}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      suffix={
        value && (
          <Button
            variant="text"
            aria-label="Clear"
            onClick={() => setValue("")}
          >
            <CloseIcon />
          </Button>
        )
      }
    />
  );
};
