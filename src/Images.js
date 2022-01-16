import './App.css';
import court from './Images/tennis_court.jpeg';
import {print} from './Test';

function Images() {
  return (
      <div className='Images'>
        <img id="image" src={court} alt="Tennis court"/>
        <button onClick={print}> Test </button>
        <canvas id="canvas" width={640} height={425} />
      </div>
  );
}

export default Images;