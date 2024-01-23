import { HTMLAttributes } from "react";
import useVideo from "../../hooks/useVideo";
import styles from "./index.module.scss";
import { PlayerComponentEnum } from "../../types";

type Props = HTMLAttributes<HTMLDivElement>;
function Header({ className, ...props }: Props) {
  const { focus } = useVideo();
  return (
    <div
      data-focus={focus}
      className={`${styles.container} ${className}`}
      {...props}
    />
  );
}
Header.PlayerComponent = PlayerComponentEnum.Header;
export default Header;
