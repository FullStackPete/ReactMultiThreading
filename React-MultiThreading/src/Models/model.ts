export type ControlBtnType = {
    actionType: string,
    appStateHandler:()=>void,
}
export type ControlPanelType = {
    appStartHandler:()=>void,
    appStopHandler:()=>void,
}