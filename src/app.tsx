import { useSearchParams } from "@yamori-shared/react-utilities";
import { Input, NavigationBarLayout } from "@yamori-design/react-components";

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams<"text">();

  return (
    <NavigationBarLayout githubHref="https://github.com/jgaik/qr">
      <Input
        value={searchParams["text"] || ""}
        onChange={(event) =>
          setSearchParams({ text: event.target.value }, { replace: true })
        }
      />
    </NavigationBarLayout>
  );
};
