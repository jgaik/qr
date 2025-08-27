import {
  Button,
  Tooltip,
  type ButtonProps,
} from "@yamori-design/react-components";
import { useMemo, type ReactElement } from "react";

type OmittedButtonProps = Pick<ButtonProps, "children" | "variant">;

interface IconButtonProps extends Omit<ButtonProps, keyof OmittedButtonProps> {
  label: string;
  icon: ReactElement;
  collapsed?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  collapsed,
  ...props
}) => {
  const buttonProps = useMemo<OmittedButtonProps>(
    () =>
      collapsed
        ? {
            children: icon,
            variant: "icon",
          }
        : {
            children: (
              <>
                {icon}
                {label}
              </>
            ),
          },
    [collapsed, icon, label]
  );

  return (
    <Tooltip content={label} disabled={!collapsed}>
      <Button {...props} {...buttonProps} />
    </Tooltip>
  );
};
