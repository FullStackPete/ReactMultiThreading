export type ControlBtnType = {
    actionType: string,
    appStateHandler:()=>void,
}
export type ControlPanelType = {
    car2Exists:boolean,
    car1Speed:number,
    car2Speed:number,
    handleCar1SpeedChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    handleCar2SpeedChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    trainSpeed:number,
    appRestartHandler:()=>void,
    handleTrainSpeedChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    numberOfCarsChanged:(event:React.ChangeEvent<HTMLSelectElement>)=>void,
}