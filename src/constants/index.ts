export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const ENV = process.env.NODE_ENV;

export const unauthenticatedRoutes = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/sign-up",
  },
];

export const adminRoutes = {
  management: [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      path: "/admin/users",
    },
    {
      title: "Quizzes",
      path: "/admin/quizzes",
    },
  ],
  monitoring: [
    {
      title: "Quiz Results",
      path: "/admin/quiz-results",
    },
  ],
};
