interface IProps {
  params: {
    id: string;
  }
}

export default function Parser({ params }: IProps) {
  return (
    <div>
      <h1>Parser - {params.id}</h1>
    </div>
  )
}
