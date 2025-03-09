import { Avatar, Button, Card, FileButton, Grid, Group, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import { SvgIcon } from "@/shared/components/ui/icon";
import { useEffect, useState } from "react";
import { useUpdateUserProfile, useUserProfile } from "../services/userProfileService";
import { UserProfile } from "../services/userProfileRepository";
import { notifications } from "@mantine/notifications";

interface ProfileFormValues extends Omit<UserProfile, 'avatarUrl'> {}

export const ProfileTab = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const { data: userProfile, isLoading } = useUserProfile();
  const updateProfileMutation = useUpdateUserProfile();
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      username: '',
      email: '',
      fullName: '',
      bio: '',
      company: '',
      role: '',
      location: '',
      website: '',
      github: '',
      twitter: '',
      linkedin: '',
    },
  });

  // Update form values when user data is loaded
  useEffect(() => {
    if (userProfile) {
      form.reset({
        username: userProfile.username,
        email: userProfile.email,
        fullName: userProfile.fullName,
        bio: userProfile.bio,
        company: userProfile.company,
        role: userProfile.role,
        location: userProfile.location,
        website: userProfile.website,
        github: userProfile.github,
        twitter: userProfile.twitter,
        linkedin: userProfile.linkedin,
      });
    }
  }, [userProfile, form]);

  const handleSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate({ 
      profile: values,
      avatar: avatar || undefined
    }, {
      onSuccess: () => {
        notifications.show({
          title: 'Success',
          message: 'Profile updated successfully',
          color: 'green',
        });
        setAvatar(null); // Clear the avatar file after successful upload
      }
    });
  };

  return (
    <Stack w="100%" px="lg">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Card withBorder>
            <Group justify="space-between" mb="lg">
              <Group>
                <Avatar 
                  size={100} 
                  radius={100}
                  src={avatar ? URL.createObjectURL(avatar) : userProfile?.avatarUrl}
                />
                <Stack gap={0}>
                  <Text fw={500} size="lg">Profile Picture</Text>
                  <Text size="sm" c="dimmed">JPG, PNG or GIF. Max size of 800K</Text>
                </Stack>
              </Group>
              <FileButton onChange={setAvatar} accept="image/png,image/jpeg,image/gif">
                {(props) => (
                  <Button variant="light" {...props}>
                    <SvgIcon name="upload" />&nbsp;
                    Change Avatar
                  </Button>
                )}
              </FileButton>
            </Group>
          </Card>

          <Card withBorder>
            <Text fw={500} size="lg" mb="md">Basic Information</Text>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Username"
                  placeholder="Enter username"
                  {...form.register('username')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Email"
                  placeholder="Enter email"
                  {...form.register('email')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...form.register('fullName')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Bio"
                  placeholder="Write a short bio about yourself"
                  minRows={3}
                  {...form.register('bio')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Company"
                  placeholder="Enter company name"
                  {...form.register('company')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Role"
                  placeholder="Enter your role"
                  {...form.register('role')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Location"
                  placeholder="Enter your location"
                  {...form.register('location')}
                />
              </Grid.Col>
            </Grid>
          </Card>

          <Card withBorder>
            <Text fw={500} size="lg" mb="md">Social Links</Text>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Website"
                  placeholder="https://your-website.com"
                  leftSection={<SvgIcon name="globe" />}
                  {...form.register('website')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="GitHub"
                  placeholder="https://github.com/username"
                  leftSection={<SvgIcon name="github" />}
                  {...form.register('github')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Twitter"
                  placeholder="https://twitter.com/username"
                  leftSection={<SvgIcon name="twitter" />}
                  {...form.register('twitter')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/username"
                  leftSection={<SvgIcon name="linkedin" />}
                  {...form.register('linkedin')}
                />
              </Grid.Col>
            </Grid>
          </Card>

          <Group justify="flex-end">
            <Button 
              type="submit" 
              size="md"
              loading={updateProfileMutation.isPending}
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
};
