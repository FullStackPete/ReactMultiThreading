interface CarProps {
  marginCar: number;
  customClass?: string;
  imageName: string;
}

const Car: React.FunctionComponent<CarProps> = ({
  marginCar,
  customClass,
  imageName,
}: CarProps) => {
  return (
    <div
      style={{ marginTop: marginCar + "px" }}
      className={`w-8 h-16 mt-16 ` + customClass}
    >
      <img src={`./img/` + imageName} className="w-10 h-18"/>
    </div>
  );
};

export default Car;
