export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const ENV = process.env.NODE_ENV;

export const unauthenticatedRoutes = [
  {
    title: "Masuk",
    path: "/login",
  },
  {
    title: "Daftar",
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
      title: "Administrators",
      path: "/admin/administrators",
    },
    {
      title: "Tryout",
      path: "/admin/tryout",
    },
    {
      title: "Subscription Plans",
      path: "/admin/subscription-plans",
    },
  ],
  monitoring: [
    {
      title: "Quiz Results",
      path: "/admin/quiz-results",
    },
  ],
  payment: [
    {
      title: "Verification",
      path: "/admin/payment-verification",
    },
    {
      title: "Logs",
      path: "/admin/payment-logs",
    },
  ],
};

export const commonRoutes = [
  {
    title: "Tentang",
    path: "#",
  },
  {
    title: "Paket",
    path: "/pricing",
  },
  {
    title: "Kontak",
    path: "#",
  },
];

export const userRoutes = {
  dashboard: {
    title: "Dashboard",
    path: "/u/dashboard",
  },
  exams: [
    {
      title: "Paket Tryout",
      path: "/u/tryout-packages",
    },
    {
      title: "Riwayat Ujian",
      path: "/u/exam-history",
    },
  ],
  results: [
    {
      title: "Hasil Ujian",
      path: "/u/exam-results",
    },
    {
      title: "Review Ujian",
      path: "/u/exam-review",
    },
  ],
  payments: [
    {
      title: "Riwayat Pembayaran",
      path: "/u/payment-history",
    },
    {
      title: "Pembayaran",
      path: "/u/make-payment",
    },
  ],
};
