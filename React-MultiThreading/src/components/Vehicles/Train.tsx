interface TrainProps {
  marginLeft: number;
  className?:string;
}

const Train: React.FunctionComponent<TrainProps> = ({ marginLeft }) => {
  return (
    <div
      style={{ marginLeft: marginLeft + "px" }}
      className="h-16 bg-red-500 w-64 mt-2"
    ></div>
  );
};

export default Train;
