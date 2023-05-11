import './App.css';
import Board from './components/board';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Dice} from './components/dice';
function App() {

  return (
    <Board dice={Dice}></Board>
  )
}

export default App;
