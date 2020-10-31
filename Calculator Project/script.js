class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement

    // Whenever the calculator opens up it clears the previous computations.
    // Fresh start always
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    
    // Converting it to a string then getting the very last value from
    // string then Chopping if Off.
    // slice method is for that only.
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
      
    // To Input Only Single "." operand
    if (number === '.' && this.currentOperand.includes('.')) return
    
    // Converting it to a string first
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    // If the currentOperand is empty then dont allow to enter a operation(+,*,/)
    if (this.currentOperand === '') return

    // If we have a value at previous operand and an operation and also a value at current operand
    // then again if the user presses a new operation then first compute the previous calculation.
    // And take result of previous computation as previous operand of newly Typed Operation.
    // 5+4 * 6 => 9*6=54.
    if (this.previousOperand !== '') {
      this.compute()
    }

    this.operation = operation
    // When We are done typing a number and pressed a operation then it would move up
    // to the previous operand position and making currentOperand empty
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    // computation variable is going to store the result of our compute function.
    let computation

    // This is going to be actual number version of our of our previousOperand.
    // Converting a string to a number.
    const prev = parseFloat(this.previousOperand)

    // This is going to be the actual number version of our currentOperand.
    // converting a string to a number.
    const current = parseFloat(this.currentOperand)

    // When Previous operand and current operand doesnot exist then simply return.
    // When user hasn't actually typed anything then compute wont work.
    if (isNaN(prev) || isNaN(current)) return

    // On pressing different operation it will perform suitable computation.
    // switch statement is just like bunch of if statements performed on a same object.
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    // Setting the current Operand on the display screen equal to computation Result.
    this.currentOperand = computation
    this.operation = undefined
    // Clearing the previousOPerand.
    this.previousOperand = ''
  }
 
  // Its a helper function to get commas(,) in out number
  getDisplayNumber(number) {
     
    // We want a string here cause we want to actually split the deciaml character 
    // inside of it.
    const stringNumber = number.toString()

    // spliting the number to the part which before the decimal place
    // and the part which comes after the decimal place.

    // Integer part which comes before the "."
    // It will take our string and turn it into an array. First in the array
    // is going to be a part before the (.)
    const integerDigits = parseFloat(stringNumber.split('.')[0])

    // Decimal part which comes after the "."
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay
    if (isNaN(integerDigits)) {
      // If the user doesn't want to enter a integer display
      // only wants an decimal number then make integerdisplay as empty string
      integerDisplay = ''
    } 

    else {
      // 'en' stands for english now commas(,) will start appearing a certain point.
      // Also we donot want any decimal places after that.
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }

    // The user has entered the Integer display as well as the Decimal Display.
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } 
    
    // The user has entered no deciaml display.
    else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)

    // If some operation is pressed then currentOperand as well as the
    // Operation will be moved up the screen Display to the previousOperand.
    // Concatenating previousOperand and operation together.
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }
    
    else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Running a loop over all number buttons. If a click event occurs.
// then append that number on the previous number string.
// Update the display.
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

// Running a loop over all operation buttons. If a click event occurs.
// then append that operation on the previousOperand string.
// Update the display.
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {

  // It will firstly compure the value.
  calculator.compute()

  // Then it will Update the display on the screen.
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
}) 