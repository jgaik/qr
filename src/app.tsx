import { NavigationBarLayout } from "@yamori-design/react-components";
import { Controls, QrCode, TextInput } from "./components";
import "./app.css";

export const App = () => {
  return (
    <NavigationBarLayout
      githubHref="https://github.com/jgaik/qr"
      className="app"
    >
      <TextInput />
      <QrCode />
      <Controls />
    </NavigationBarLayout>
  );
};
