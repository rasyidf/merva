export interface UserProfile {
  username: string;
  email: string;
  fullName: string;
  bio: string;
  company: string;
  role: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  avatarUrl?: string;
}

export interface UserProfileRepository {
  getProfile(): Promise<UserProfile>;
  updateProfile(profile: Partial<UserProfile>, avatar?: File): Promise<UserProfile>;
}

export class MockUserProfileRepository implements UserProfileRepository {
  private profile: UserProfile = {
    username: 'johndoe',
    email: 'john@example.com',
    fullName: 'John Doe',
    bio: 'Software Engineer with passion for building great products',
    company: 'Tech Corp',
    role: 'Senior Developer',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    avatarUrl: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  };

  async getProfile(): Promise<UserProfile> {
    return this.profile;
  }

  async updateProfile(updates: Partial<UserProfile>, avatar?: File): Promise<UserProfile> {
    if (avatar) {
      // In a real implementation, this would upload the file to a server
      this.profile.avatarUrl = URL.createObjectURL(avatar);
    }
    
    this.profile = {
      ...this.profile,
      ...updates
    };

    return this.profile;
  }
}

export class ApiUserProfileRepository implements UserProfileRepository {
  private baseUrl: string;

  constructor(baseUrl = '/api/profile') {
    this.baseUrl = baseUrl;
  }

  async getProfile(): Promise<UserProfile> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async updateProfile(updates: Partial<UserProfile>, avatar?: File): Promise<UserProfile> {
    try {
      const formData = new FormData();
      
      if (avatar) {
        formData.append('avatar', avatar);
      }
      
      formData.append('profile', JSON.stringify(updates));

      const response = await fetch(this.baseUrl, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}