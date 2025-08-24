import { Button } from "@yamori-design/react-components";

type ControlsProps = {
  onDownload: () => void;
};

export const Controls: React.FC<ControlsProps> = ({ onDownload }) => {
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
    </div>
  );
};
