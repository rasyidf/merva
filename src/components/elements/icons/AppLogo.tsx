import { Image, ImageProps } from "@mantine/core";
type Props = {} & ImageProps;

const AppLogo = (props: Props) => {
  return <Image w={64} h={64} {...props} src="/logo-merva.svg" fit="contain" />;
};

export default AppLogo;
