import axiosClient from "../AxiosClient";

export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed";
  instructor: string;
  group: string;
  questions_number: number;
  questions: string[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: "easy" | "medium" | "hard" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  closed_at?: string;
  participants: number;
}

export interface CreateQuizData {
  title: string;
  description?: string;
  group: string;
  questions_number: number;
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  date?: string;
  time?: string;
}

export interface UpdateQuizData extends Partial<CreateQuizData> {
  id: string;
}

export interface JoinQuizData {
  code: string;
}



export interface SubmitQuizData {
  answers: {
    question: string;
    answer: string;
  }[];
}

export interface ReassignQuizData {
  quizId: string;
  studentIds: string[];
}

export interface QuizDetails {
    _id: string
    title: string
    questions: {
        _id: string
        title: string
        options: { A: string; B: string; C: string; D: string;_id: string }
    }
    description: string
    difficulty: string
    type: string
    questions_number: number
    duration: number
    schadule:string
    score_per_question:number
}

// GET: getAll
export const apiGetAllQuizzes = () => {
  return axiosClient.get<Quiz[]>("/api/quiz");
};

// GET: getById
export const apiGetQuizById = (id: string) => {
  return axiosClient.get<QuizDetails>(`/api/quiz/${id}`);
};

// POST: create
export const apiCreateQuiz = (data: CreateQuizData) => {
  return axiosClient.post("/api/quiz", data);
};

// PUT: update
export const apiUpdateQuiz = (id: string, data: UpdateQuizData) => {
  return axiosClient.put(`/api/quiz/${id}`, data);
};

// DEL: delete
export const apiDeleteQuiz = (id: string) => {
  return axiosClient.delete(`/api/quiz/${id}`);
};

// POST: join
export const apiJoinQuiz = (data: JoinQuizData) => {
  return axiosClient.post("/api/quiz/join", data);
};

// POST: submit
export const apiSubmitQuiz = (quizId: string, data: SubmitQuizData) => {
  return axiosClient.post(`/api/quiz/submit/${quizId}`, data);
};

// GET: questionsWithoutAnswers

export const apiGetQuestionsWithoutAnswers = (id: string) =>
  axiosClient.get(`/api/quiz/without-answers/${id}`);   

// GET: allResults
export const apiGetAllQuizResults = () => {
  return axiosClient.get("/api/quiz/result");
};

export const apiGetIncomingQuizzes = () => {
  return axiosClient.get<Quiz[]>("/api/quiz/incomming");
};

export const apiGetCompletedQuizzes = () => {
  return axiosClient.get<Quiz[]>("/api/quiz/completed");
};

// POST: reassign
export const apiReassignQuiz = (data: ReassignQuizData) => {
  return axiosClient.post("/api/quiz/reassign", data);
};
