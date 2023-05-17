interface IProps {
  title: string;
}

export const PageTitle = ({ title }: IProps) => {
  return <h1 className="text-lg font-semibold my-4">{title}</h1>;
};
