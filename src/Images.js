import './App.css';
import court from './Images/tennis_court.jpeg';
import {print} from './Test';

function Images() {
  return (
      <div className='Images'>
        <img src={court} />
        <button onClick={print}> Test </button>
      </div>
  );
}

export default Images;