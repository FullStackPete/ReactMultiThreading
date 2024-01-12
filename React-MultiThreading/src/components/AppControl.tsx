import ControlBtn from "./ControlBtn";

function AppControl() {
  return (
    <div className="flex bg-black justify-center items-center h-28">      
        <ControlBtn actionType="Start" />
        <ControlBtn actionType="Stop" />
    </div>
  );
}

export default AppControl;
