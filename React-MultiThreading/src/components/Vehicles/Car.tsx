interface CarProps {
    marginValue:number
}
 
const Car: React.FunctionComponent<CarProps> = ({marginValue}:CarProps) => {
    return ( 
        <div style={{marginTop:marginValue+"px"}} 
        className="w-8 h-16 ml-1 bg-yellow-400 mt-16">
        </div>
     );
}
 
export default Car;