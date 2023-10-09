import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../sortingAlgos/mergeSort";
import { getSelectionSortAnimations } from "../sortingAlgos/selectionSort";
import { getInsertionSortAnimations } from "../sortingAlgos/insertionSort";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 20;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = "chartreuse";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "blueviolet";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  resetArray = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(getRandomNumber(5, 700));
    }
    this.setState({ array: array });
  };

  visualVerification = () => {
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      const bar = arrayBars[i].style;
      setTimeout(() => {
        bar.backgroundColor = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
    }
  };
  insertionSort = () => {
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx] = animations[i];

      if (barTwoIdx === -1) {
        // marking biggest value of the iteration
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor =
            barOneStyle.backgroundColor === PRIMARY_COLOR
              ? SECONDARY_COLOR
              : PRIMARY_COLOR;
          console.log(`bar ${barOneIdx} is ${barOneStyle.backgroundColor}`);
        }, i * ANIMATION_SPEED_MS);
      } else {
        // biggest value of the iteration
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;

          barOneStyle.backgroundColor =
            barOneStyle.backgroundColor === SECONDARY_COLOR
              ? SECONDARY_COLOR
              : PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;

          let temp = barOneStyle.height;
          let barTwoHeight = barTwoStyle.height;
          barOneStyle.height = barTwoHeight;
          barTwoStyle.height = temp;
          barTwoStyle.height = temp;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  selectionSort = () => {
    const animations = getSelectionSortAnimations(this.state.array);
    let k = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx] = animations[i];
      const barTwoStyle = arrayBars[barTwoIdx].style;
      let minBarStyle = arrayBars[k].style;

      if (barOneIdx !== -1) {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor =
            barOneStyle.backgroundColor !== PRIMARY_COLOR
              ? PRIMARY_COLOR
              : SECONDARY_COLOR;
          barTwoStyle.backgroundColor =
            barTwoStyle.backgroundColor !== SECONDARY_COLOR
              ? SECONDARY_COLOR
              : PRIMARY_COLOR;
        }, (i * ANIMATION_SPEED_MS) / 5);
      } else {
        setTimeout(() => {
          let temp = minBarStyle.height;
          let barTwoHeight = barTwoStyle.height;
          // minBarStyle.backgroundColor = SECONDARY_COLOR;
          minBarStyle.height = barTwoHeight;
          // barTwoStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.height = temp;
        }, (i * ANIMATION_SPEED_MS) / 5);
        k++;
      }
    }
  };

  mergeSort = () => {
    {
      const animations = getMergeSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName("array-bar");
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            // barOneStyle.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  };

  componentDidMount() {
    this.resetArray();
  }

  render() {
    const { array } = this.state;
    return (
      <div className="page-container">
        <div className="button-container">
          <button className="button" onClick={this.resetArray}>
            Generate New Array
          </button>
          <button className="button" onClick={this.mergeSort}>
            merge sort
          </button>
          <button className="button" onClick={this.selectionSort}>
            selection sort
          </button>
          <button className="button" onClick={this.insertionSort}>
            insertion sort
          </button>
          <button className="button" onClick={this.insertionSort}>
            insertion sort
          </button>
          <button className="button" onClick={this.insertionSort}>
            insertion sort
          </button>
          <button className="button" onClick={this.insertionSort}>
            insertion sort
          </button>
          <button className="button" onClick={this.visualVerification}>
            test boutton
          </button>
        </div>
        <div className="bars-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function getRandomNumber(min, max) {
  // Ensure that min and max are numbers
  min = typeof min === "number" ? min : 0;
  max = typeof max === "number" ? max : 1;

  // Swap min and max values if min is greater than max
  if (min > max) {
    [min, max] = [max, min];
  }

  // Calculate the range of numbers (inclusive)
  const range = max - min + 1;

  // Generate a random number within the range
  const randomNum = Math.floor(Math.random() * range) + min;

  return randomNum;
}
