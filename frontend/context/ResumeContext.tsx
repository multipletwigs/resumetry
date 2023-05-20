import { CompanyJobOpening } from "@/data/JobDescriptions";
import { createContext, useState, ReactNode, useContext } from "react";

interface ResumeContextContent {
  resume: string;
  job: CompanyJobOpening;
}

interface ResumeContext {
  useResume: [
    ResumeContextContent[] | null,
    React.Dispatch<React.SetStateAction<ResumeContextContent[]>>
  ];
}

const ResumeContext = createContext<ResumeContext>({
  useResume: [null, () => {}],
});

const ResumeContextProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeContextContent[]>([]);

  return (
    <ResumeContext.Provider value={{ useResume: [resume, setResume] }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
export default ResumeContextProvider;
