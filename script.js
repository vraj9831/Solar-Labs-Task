const checkboxCard = document.querySelector(".checkbox-card");
const yearCards = document.querySelectorAll(".year-card");
const checkboxInputs = document.querySelectorAll(".checkbox-card input");

/* ------------------- FUNCTIONS ------------------- */
const displayElement = (element, show) => {
  if (element) {
    if (show) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  }
};

const disableInputsExcept = (inputs, activeIndex) => {
  for (let i = 0; i < 4; i++) {
    if (activeIndex == i) {
      continue;
    }
    inputs[i].disabled = true;
  }
};

const enableAllInputs = (inputs) => {
  for (let i = 0; i < 4; i++) {
    inputs[i].disabled = false;
  }
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const reset = (inputs) => {
  console.log(inputs);
  for (let i = 0; i < 4; i++) {
    inputs[i].value = 0;
    inputs[i].disabled = false;
  }
};

const calculate = (inputs, index, value) => {
  const min = Number(value) - 100,
    max = Number(value) + 100;
  for (let i = 0; i < 4; i++) {
    if (index == i) {
      continue;
    }
    inputs[i].value = randomInteger(min, max);
  }
  enableAllInputs(inputs);
};

/* ------------------- MAIN LOGIC ------------------- */
/* 1. Year Cards Display */
checkboxCard.addEventListener("click", (e) => {
  if (e.target.value) {
    for (let i = 0; i < 3; i++) {
      displayElement(yearCards[i], checkboxInputs[i].checked);
    }
  }
});

yearCards.forEach((yearCard) => {
  const dropdown = yearCard.querySelector("select");
  const monthsContainers = yearCard.querySelectorAll(".months-container"); // [Jan-Apr, May-Aug, Sep-Dec] : 3

  /* 2. Month Inputs Display */
  dropdown.onclick = () => {
    for (let i = 0; i < 3; i++) {
      if (i == dropdown.selectedIndex - 1) {
        displayElement(monthsContainers[i], true);
      } else {
        displayElement(monthsContainers[i], false);
      }
    }
  };

  let displayedInputs, selectedIndex, indexValue;

  /* 3. Disabling Other Inputs */
  monthsContainers.forEach((container) => {
    const inputs = container.querySelectorAll("input"); // [Jan, Feb, Mar, Apr]

    inputs.forEach((input, index) => {
      input.oninput = (e) => {
        // Get info for reset and calculate
        selectedIndex = index;
        indexValue = e.target.value;
        displayedInputs = inputs;
        // Disable the other 3 inputs
        disableInputsExcept(inputs, index);
      };
    });
  });

  /* 4. Reset */
  const resetBtn = yearCard.querySelector(".reset-btn");
  resetBtn.onclick = () => reset(displayedInputs);

  /* 5. Calculate */
  const calculateBtn = yearCard.querySelector(".calculate-btn");
  calculateBtn.onclick = () =>
    calculate(displayedInputs, selectedIndex, indexValue);
});
