interface IProps {
  title: string;
}

export const PageTitle = ({ title }: IProps) => {
  return (
    <header className="px-5 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">{title}</h2>
    </header>
  );
};
