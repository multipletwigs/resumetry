export interface UserData {
  name: string;
  available: boolean;
  appRole: AppRole;
  details: {
    seniority: string;
    workExp: number;
    location: string;
    type: string;
  }
}

export type AppRole = 'candidate' | 'recruiter';

// export const USER_DATA: UserData[] = [
//   {
//     name: 'John Doe',
//     available: true,
//     appRole: 'candidate',
//     details: {
//       seniority: 'Senior',
//       workExp: 5,
//       location: 'London',
//       type: 'Full-time'
//   }, {
//     name: 'Jane Doe',
//     available: false,
//     appRole: 'recruiter',
//     details: {
//       seniority: 'Senior',
//       workExp: 5,
//       location: 'London',
//       type: 'Full-time'
//   }}
// ] 

