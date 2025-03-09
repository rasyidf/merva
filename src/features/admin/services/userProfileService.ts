import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { UserProfile } from "./userProfileRepository";
import { MockUserProfileRepository } from "./userProfileRepository";

const userProfileRepository = new MockUserProfileRepository();

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userProfileRepository.getProfile(),
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profile, avatar }: { profile: Partial<UserProfile>; avatar?: File }) => {
      return userProfileRepository.updateProfile(profile, avatar);
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: 'Failed to update profile',
        color: 'red',
      });
      console.error('Error updating profile:', error);
    },
  });
};