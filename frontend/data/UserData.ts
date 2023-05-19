export interface UserData {
  name: string;
  available: boolean;
  details: {
    seniority: string;
    workExp: number;
    location: string;
    type: string;
  }
}

export const USER_DATA = {
    name: 'John Doe',
    available: true,
    details: {
      seniority: 'Junior',
      workExp: 2,
      location: 'Malaysia',
      type: 'Full-time',
    }
}

