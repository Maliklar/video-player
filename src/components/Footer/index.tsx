import { HTMLAttributes } from "react";
import useVideo from "../../hooks/useVideo";
import styles from "./index.module.scss";

type Props = HTMLAttributes<HTMLDivElement>;
function Footer({ className, ...props }: Props) {
  const { focus } = useVideo();
  return (
    <div
      className={`${styles.container} ${className}`}
      data-focus={focus}
      {...props}
    />
  );
}

export default Footer;
