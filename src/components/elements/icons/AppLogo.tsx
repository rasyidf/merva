import { Image, ImageProps } from "@mantine/core";
type Props = {} & ImageProps;

const AppLogo = (props: Props) => {
  return <Image w={48} h={48} {...props} src="/logo-merva.svg" fit="contain" alt="merva-logo" />;
};

export default AppLogo;
