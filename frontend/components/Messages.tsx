
interface Message{
  id: number;
  jobApplicationId: number;
  senderId: number;
  receiverId: number;
  message: string;
  date: Date;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    jobApplicationId: 1,
    senderId: 1,
    receiverId: 2,
    message: "Hello, how are you?",
    date: new Date()
  },
  {
    id: 2,
    jobApplicationId: 1,
    senderId: 2,
    receiverId: 1,
    message: "I'm good, how are you?",
    date: new Date()
  }
] 