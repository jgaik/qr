import { NavigationBarLayout } from "@yamori-design/react-components";
import { QrCode, TextInput } from "./components";

export const App = () => {
  return (
    <NavigationBarLayout githubHref="https://github.com/jgaik/qr">
      <TextInput />
      <QrCode />
    </NavigationBarLayout>
  );
};
