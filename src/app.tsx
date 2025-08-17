import { useSearchParams } from "@yamori-shared/react-utilities";
import { NavigationBarLayout } from "@yamori-design/react-components";
import { useEffect } from "react";

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);
  return (
    <NavigationBarLayout githubHref="https://github.com/jgaik/qr"></NavigationBarLayout>
  );
};
