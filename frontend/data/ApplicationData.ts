import { FormInformation } from "@/components/FormSubmission";
import { CompanyJobOpening } from "./JobDescriptions";

export interface ApplicationData {
  formInformation: FormInformation; 
  jobOpening: CompanyJobOpening;
}

export const APPLICATION_DATA: ApplicationData[] = [
  {
    formInformation: {
      name: "John Doe",
      resume: null,
      phoneNumber: "1234567890",
      email: "johndoe@example.com",
      coverLetter: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    jobOpening: {
      jobId: 1,
      jobTitle: "Software Developer",
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      jobRequirements: ["Bachelor's degree in Computer Science", "2+ years of experience"],
      jobType: "Full-time",
      jobSeniority: "Mid-level",
      jobLocation: "New York, NY",
      jobSalary: 80000,
    },
  },
  {
    formInformation: {
      name: "Jane Smith",
      resume: null,
      phoneNumber: "9876543210",
      email: "janesmith@example.com",
      coverLetter: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    jobOpening: {
      jobId: 2,
      jobTitle: "Graphic Designer",
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      jobRequirements: ["Bachelor's degree in Graphic Design", "Proficiency in Adobe Creative Suite"],
      jobType: "Part-time",
      jobSeniority: "Entry-level",
      jobLocation: "Los Angeles, CA",
      jobSalary: 50000,
    },
  },
];