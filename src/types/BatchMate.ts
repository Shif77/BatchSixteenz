export interface BatchMate {
  id: number;
  name: string;
  picture: string;
  dob: string;
  bloodGroup: string;
  description: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
  };
  email?: string;
  phone?: string;
  profession?: string;
  location?: string;
}