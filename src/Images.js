import './App.css';
import court from './Images/tennis_court.jpeg';
import {print} from './Test';

function Images() {

    return (
        <div className='Images'>
            <canvas id="canvas" width={800} height={800} />
            <button  onClick={print}> Test </button>
        </div>
    );
}

export default Images;