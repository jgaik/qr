import { Button, type ButtonProps } from "@yamori-design/react-components";
import { useMemo, type ReactElement } from "react";

type OmittedButtonProps = Pick<
  ButtonProps,
  "aria-label" | "children" | "variant"
>;

interface ControlButtonProps
  extends Omit<ButtonProps, keyof OmittedButtonProps> {
  label: string;
  icon: ReactElement;
  collapsed?: boolean;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  label,
  icon,
  collapsed,
  ...props
}) => {
  const buttonProps = useMemo<OmittedButtonProps>(
    () =>
      collapsed
        ? {
            "aria-label": label,
            "children": icon,
            "variant": "icon",
          }
        : {
            children: [icon, label],
          },
    [collapsed, icon, label]
  );

  return <Button {...props} {...buttonProps} />;
};
