export interface CompanyInfo{
  name: string;
  location: string;
  industry: string;
  size: number;
  type: string;
  description: string;
  jobOpenings: CompanyJobOpening[];
}

export interface CompanyJobOpening{
  jobId: number; 
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string[];
  jobType: string;
  jobSeniority: string;
  jobLocation: string;
  jobSalary: number;
}

export const COMPANIES: CompanyInfo[] = [
  {
    name: "ABC Tech Solutions",
    location: "San Francisco, CA",
    industry: "Technology",
    size: 1000,
    type: "Private",
    description: "ABC Tech Solutions is a leading technology company specializing in software development and IT consulting.",
    jobOpenings: [
      {
        jobId: 1,
        jobTitle: "Frontend Developer",
        jobDescription: "Develop and maintain user interfaces for web applications using modern frontend frameworks and technologies.",
        jobRequirements: ["Proficient in HTML, CSS, and JavaScript", "Experience with React or Angular", "Strong problem-solving skills"],
        jobType: "Full-time",
        jobSeniority: "Mid-level",
        jobLocation: "San Francisco, CA",
        jobSalary: 80000,
      },
      {
        jobId: 2,
        jobTitle: "Software Engineer",
        jobDescription: "Design and develop high-quality software solutions using Java and related technologies.",
        jobRequirements: ["Solid understanding of object-oriented programming", "Experience with Spring framework", "Strong analytical and problem-solving skills"],
        jobType: "Full-time",
        jobSeniority: "Senior",
        jobLocation: "San Francisco, CA",
        jobSalary: 120000,
      },
    ],
  },
  {
    name: "XYZ Marketing Agency",
    location: "New York, NY",
    industry: "Marketing",
    size: 500,
    type: "Private",
    description: "XYZ Marketing Agency is a full-service marketing agency helping businesses achieve their marketing goals and increase brand visibility.",
    jobOpenings: [
      {
        jobId: 3,
        jobTitle: "Marketing Specialist",
        jobDescription: "Develop and implement marketing campaigns to promote client products and services.",
        jobRequirements: ["Strong written and verbal communication skills", "Experience with digital marketing channels", "Ability to analyze campaign performance"],
        jobType: "Full-time",
        jobSeniority: "Entry-level",
        jobLocation: "New York, NY",
        jobSalary: 50000,
      },
      {
        jobId: 4,
        jobTitle: "Graphic Designer",
        jobDescription: "Create visually appealing designs for various marketing materials and digital platforms.",
        jobRequirements: ["Proficient in Adobe Creative Suite", "Strong understanding of design principles", "Ability to work collaboratively in a team"],
        jobType: "Full-time",
        jobSeniority: "Junior",
        jobLocation: "New York, NY",
        jobSalary: 60000,
      },
    ],
  },
  {
    name: "123 Analytics Inc.",
    location: "Chicago, IL",
    industry: "Analytics",
    size: 200,
    type: "Public",
    description: "123 Analytics Inc. is a data analytics company providing businesses with actionable insights to drive data-informed decision making.",
    jobOpenings: [
      {
        jobId: 5,
        jobTitle: "Data Analyst",
        jobDescription: "Analyze complex datasets and extract valuable insights to support business decision making.",
        jobRequirements: ["Proficient in SQL and data querying", "Experience with statistical analysis tools", "Strong attention to detail"],
        jobType: "Full-time",
        jobSeniority: "Mid-level",
        jobLocation: "Chicago, IL",
        jobSalary: 70000,
      },
      {
        jobId: 6,
        jobTitle: "Data Scientist",
        jobDescription: "Develop and apply advanced analytical models to solve complex business problems.",
        jobRequirements: ["Strong knowledge of machine learning algorithms", "Experience with Python and data manipulation libraries", "Ability to communicate complex findings to non-technical stakeholders"],
        jobType: "Full-time",
        jobSeniority: "Senior",
        jobLocation: "Chicago, IL",
        jobSalary: 100000,
      },
    ],
  },
];


