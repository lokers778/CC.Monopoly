class Dices {
    constructor() {
        this.firstDice = 0;
        this.secondDice = 0;
        this.move = 0;
        this.isDouble = false;
    }

    throwDices() {
        this.firstDice = throwDice('dice1');
        this.secondDice = throwDice('dice2');
        this.move = this.firstDice + this.secondDice;
        this.isDouble = this.firstDice === this.secondDice ? true : false; 
        return this.move;
    }

    getMove() {
        return this.move;
    }

    getDouble() {
        return this.isDouble;
    }
}

const throwDice = (string) => {
    const temp = Math.floor(Math.random() * 6) + 1;
    const diceIcons = ['fa-dice-one','fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six'];
    const element = document.querySelector(`.${string}`).firstElementChild;
    const iconClass = element.classList.item(1);
    element.classList.remove(iconClass);
    element.classList.add(diceIcons[temp-1]);
    document.getElementById("throwDice").style.visibility = "hidden";
    document.getElementById("endRound").style.visibility = "visible";
    return temp;
}



export default Dices;