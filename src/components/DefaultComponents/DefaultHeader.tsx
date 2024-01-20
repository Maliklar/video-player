import Header from "../Header";

type Props = {
  title?: string;
};

export default function DefaultHeader({ title }: Props) {
  return (
    <Header>
      <h3>{title}</h3>
    </Header>
  );
}
