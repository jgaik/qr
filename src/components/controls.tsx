import { Button } from "@yamori-design/react-components";

export const Controls: React.FC = () => {
  return (
    <Button
      onClick={() =>
        navigator.share({
          url: window.location.href,
        })
      }
    >
      Share
    </Button>
  );
};
