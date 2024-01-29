import { useState } from "react";

function CarRoad({ children }: any) {
  return (
    <>
      <div
        id="CarRoad"
        className="absolute left-1/2 -translate-x-1/2 h-screen w-20 bg-slate-700"
      >
        <div className="flex flex-row">{children}</div>
      </div>
    </>
  );
}

export default CarRoad;
