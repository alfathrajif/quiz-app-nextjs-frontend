const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen py-12 items-center justify-center px-6 sm:px-0">
      {children}
    </div>
  );
};

export default AuthLayout;
