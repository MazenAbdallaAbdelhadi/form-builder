const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col flex-grow mx-auto">{children}</div>
  );
};

export default FormLayout;
