import { MouseEventHandler, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  onClick?: MouseEventHandler;
}
export const Button = ({ children, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className="border-base-content bg-base-300 rounded-lg border border-opacity-5 p-1 mx-1 bg-green-400"
    >
      {children}
    </button>
  );
};
