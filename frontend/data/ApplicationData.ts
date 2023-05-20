import { FormInformation } from "@/components/FormSubmission";
import { CompanyJobOpening } from "./JobDescriptions";

export interface ApplicationData {
  applicationId: number;
  formInformation: FormInformation; 
  jobOpening: CompanyJobOpening;
  resumeParsed: string; 
}

export const APPLICATION_DATA: ApplicationData[] = [];