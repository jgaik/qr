import { Input } from "@yamori-design/react-components";
import { useSearchParams } from "@yamori-shared/react-utilities";

export const TextInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams<"text">();
  return (
    <Input
      value={searchParams["text"] ?? ""}
      onChange={(event) => {
        setSearchParams(
          { text: event.target.value },
          { replace: true, dispatchEvent: true }
        );
      }}
    />
  );
};
