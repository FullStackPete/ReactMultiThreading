export type SpeedChangeFunctionType = {
    value:number,
    onChange:React.ChangeEventHandler<HTMLInputElement>,
    title:string,
    min:number,
    max:number,
}

function SpeedChange({value,onChange,title,min,max}:SpeedChangeFunctionType) {
    return ( <div className="flex flex-col m-4">
    <p className="text-white text-center">{title}</p>
        <input type="range" 
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        />  
        <span>{value}</span>
  </div> );
}

export default SpeedChange;