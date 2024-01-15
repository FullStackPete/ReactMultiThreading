import { useState } from 'react';

function CarRoad({children}:any) {    


    return ( <>
    <div id="CarRoad" className="absolute left-1/2 -translate-x-1/2 h-screen w-20 bg-slate-700">        
    {children}    
    </div>
    </> );
}

export default CarRoad;