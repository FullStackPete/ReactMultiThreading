import { ControlBtnType } from "../Models/model";

function ControlBtn({ actionType,appStateHandler }: ControlBtnType) {
  return (
    <button
    onClick={appStateHandler}
      className={`border-2 rounded-xl text-xl text-white p-2 m-2 ${
        actionType === "Restart" ? "border-blue-500" : "border-red-500"
      }`}
    >
      {actionType}
    </button>
  );
}

export default ControlBtn;
