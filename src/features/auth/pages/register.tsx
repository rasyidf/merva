import { Anchor, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LocalizationService } from "@/shared/services/i18n/i18n.service";

const PATH_DASHBOARD = {
  default: "/app/dashboard",
  login: "/auth/login",
  root: "/app",
};

export default function Page() {
  const { t } = useTranslation("auth"); 
  return (
    <>
      <Text fz={16} fw={600}>{t('register.welcome')}</Text>
      <Text fz={14}>{t('register.subtitle')}</Text>

      <TextInput 
        label={t('register.email')} 
        placeholder={t('register.email_placeholder')} 
        required mt="md" 
      />
      <PasswordInput 
        label={t('register.password')} 
        placeholder={t('register.password_placeholder')} 
        required mt="md" 
      />
      <PasswordInput 
        label={t('register.confirm_password')} 
        placeholder={t('register.confirm_password_placeholder')} 
        required mt="md" 
      />
      <Button fullWidth mt="xl" component={Link} to={PATH_DASHBOARD.default}>
        {t('register.create_account')}
      </Button>
      <Text fz={14} ta="center" mt="lg">
        {t('register.have_account')}{" "}
        <Anchor component={Link} to={PATH_DASHBOARD.login} fz={14} c="blue" ta="center">
          {t('register.sign_in')}
        </Anchor>
      </Text>
    </>
  );
}
