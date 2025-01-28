import { Notify } from "@/shared/services";
import { useViewNavigate } from "@/shared/utils/routers";
import { Alert, Button, Card, Checkbox, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type LoginFormInputs = {
  email: string;
  username: string;
  pw: string;
};

const PATH_AUTH = {
  signup: "/auth/register",
  passwordReset: "/auth/password-reset",
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, setError } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      username: "",
      pw: "",
    },
  });

  const { t } = useTranslation("auth");
  const navigate = useViewNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);

    // if honey pot is filled, then it's a bot
    if (data.username) {
      setIsLoading(false);
      return;
    }

    if (data.email === "admin@mail.com" && data.pw === "Rahasia123") {
      setTimeout(() => {
        navigate("/app/dashboard");
        setIsLoading(false);
      }, 1000);
    } else {
      Notify.error("Error", "Your credentials are invalid");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack>
        <Text fw={600} fz={16}>{t('login.title')}</Text>
        <Text fz={14}>{t('login.subtitle')}</Text>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input type="text" style={{ display: "none" }} {...register("username")} />
          <TextInput 
            label={t('login.email')} 
            placeholder={t('login.email_placeholder')} 
            required {...register("email", { required: true })} 
          />
          <PasswordInput
            label={t('login.password')}
            placeholder={t('login.password_placeholder')}
            required
            mt="md"
            {...register("pw", { required: true })}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label={t('login.remember_me')} />
            <Text component={Link} to={PATH_AUTH.passwordReset} size="sm">
              {t('login.forgot_password')}
            </Text>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            {t('login.sign_in')}
          </Button>
        </form>
        <Text ta="center" fz={14}>
          {t('login.no_account')}{" "}
          <Text component={Link} to={PATH_AUTH.signup} fz={14} c="blue">
            {t('login.sign_up')}
          </Text>
        </Text>
      </Stack>
      {formState.errors.root && (
        <Alert color="red" style={{ marginBottom: 20 }}>
          {formState.errors.root.message}
        </Alert>
      )}
    </>
  );
}
