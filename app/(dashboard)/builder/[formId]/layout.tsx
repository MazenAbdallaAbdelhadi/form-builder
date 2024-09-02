import React from "react";

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full flex flex-grow mx-auto">{children}</div>;
};

export default BuilderLayout;
