import CarRoad from "./components/CarRoad";
import TrainRoad from "./components/TrainRoad";
import AppControl from "./components/AppControl";
function App() {
  return (
    <>
      
        <AppControl />      
        <div className="h-screen">
          <CarRoad />
          <TrainRoad />
        </div>
    </>
  );
}

export default App;
