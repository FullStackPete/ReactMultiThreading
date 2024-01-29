interface TrainProps {
  marginLeft: number;
  className?:string;
}

const Train: React.FunctionComponent<TrainProps> = ({ marginLeft }) => {
  return (
    <div
      style={{ marginLeft: marginLeft + "px" }}
      className="w-80 mt-4"
    >
      <img src="img/CHOOCHOO.png"/>
    </div>
  );
};

export default Train;
