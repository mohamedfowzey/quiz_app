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
  schadule: string; //
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
  questions: string[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
}

export interface UpdateQuizData extends Partial<CreateQuizData> {
  id: string;
}

export interface JoinQuizData {
  code: string;
}

export interface SubmitQuizData {
  quizId: string;
  answers: {
    questionId: string;
    answer: string;
  }[];
}

export interface ReassignQuizData {
  quizId: string;
  studentIds: string[];
}

// GET: getAll
export const apiGetAllQuizzes = () => {
  return axiosClient.get<Quiz[]>("/api/quiz");
};

// GET: getById
export const apiGetQuizById = (id: string) => {
  return axiosClient.get<Quiz>(`/api/quiz/${id}`);
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
export const apiSubmitQuiz = (data: SubmitQuizData) => {
  return axiosClient.post("/api/quiz/submit", data);
};

// GET: questionsWithoutAnswers
export const apiGetQuestionsWithoutAnswers = (quizId: string) => {
  return axiosClient.get(`/api/quiz/questions-no-answers/${quizId}`);
};

// GET: allResults
export const apiGetAllQuizResults = () => {
  return axiosClient.get("/api/quiz/results");
};

// GET: firstFiveIncomming
export const apiGetFirstFiveIncoming = () => {
  return axiosClient.get<Quiz[]>("/api/quiz/incoming/first-five");
};

// GET: lastFiveCompleted
export const apiGetLastFiveCompleted = () => {
  return axiosClient.get<Quiz[]>("/api/quiz/completed/last-five");
};

// POST: reassign
export const apiReassignQuiz = (data: ReassignQuizData) => {
  return axiosClient.post("/api/quiz/reassign", data);
};
