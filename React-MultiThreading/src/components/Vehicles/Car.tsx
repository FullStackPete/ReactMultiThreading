interface CarProps {
    marginCar:number
}
 
const Car: React.FunctionComponent<CarProps> = ({marginCar}:CarProps) => {
    return ( 
        <div style={{marginTop:marginCar+"px"}} 
        className="w-8 h-16 ml-1 bg-yellow-400 mt-16">
        </div>
     );
}
 
export default Car;