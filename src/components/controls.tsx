import { useSearchParams } from "@yamori-shared/react-utilities";
import { useSavedQrs } from "../utilities";
import {
  DownloadIcon,
  PrintIcon,
  SaveIcon,
  ShareIcon,
} from "@yamori-design/icons";
import { IconButton } from "./icon-button";
import { type ComponentRef, useLayoutEffect, useRef, useState } from "react";

type ControlsProps = {
  onDownload: () => void;
};

export const Controls: React.FC<ControlsProps> = ({ onDownload }) => {
  const containerRef = useRef<ComponentRef<"div">>(null);
  const checkedWidthRef = useRef<number>(0);
  const isCollapsedRef = useRef(false);

  const [searchParams] = useSearchParams<"text">();
  const [savedQrs, setSavedQrs] = useSavedQrs();

  const [isCollapsed, setIsCollapsed] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerNode = containerRef.current;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (isCollapsedRef.current) {
        if (entry.contentRect.width - checkedWidthRef.current > 5) {
          checkedWidthRef.current = 0;
          isCollapsedRef.current = false;
          setIsCollapsed(false);
        }
      } else {
        if (checkedWidthRef.current > entry.contentRect.width) return;
        if (containerNode.scrollWidth > containerNode.clientWidth) {
          checkedWidthRef.current = entry.contentRect.width;
          isCollapsedRef.current = true;
          setIsCollapsed(true);
        }
      }
    });

    resizeObserver.observe(containerNode);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="controls" ref={containerRef}>
      <IconButton
        icon={<ShareIcon />}
        label="Share"
        onClick={() =>
          navigator.share({
            url: window.location.href,
          })
        }
        collapsed={isCollapsed}
      />
      <IconButton
        icon={<PrintIcon />}
        label="Print"
        onClick={() => window.print()}
        collapsed={isCollapsed}
      />
      <IconButton
        icon={<DownloadIcon />}
        label="Download"
        onClick={onDownload}
        collapsed={isCollapsed}
      />
      <IconButton
        icon={<SaveIcon />}
        label="Save"
        onClick={() =>
          setSavedQrs([
            ...(savedQrs ?? []),
            { text: searchParams.text!, date: Date.now() },
          ])
        }
        disabled={
          !searchParams.text ||
          savedQrs?.some(({ text }) => text === searchParams.text)
        }
        collapsed={isCollapsed}
      />
    </div>
  );
};
