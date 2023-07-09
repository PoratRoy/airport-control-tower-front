import Airport from "./components/Airport/Airport";
import LandingList from './components/Lists/LandingList/LandingList'
import TakeofList from './components/Lists/TakeofList/TakeofList'
import ScheduleList from './components/Lists/ScheduleList/ScheduleList'
import { SocketContext, socket } from "./context/socketContext";
import "./App.css";

function App() {
  return (
    <SocketContext.Provider value={{ socket }}>
      <div>
        <ScheduleList/>
        <LandingList/>
        <Airport />
        <TakeofList/>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
