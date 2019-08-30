class Dices {
    constructor() {
        this.firstDice = 0;
        this.secondDice = 0;
        this.move = 0;
        this.isDouble = false;
    }

    throwDices() {
        this.firstDice = Math.floor(Math.random() * 6) + 1;
        this.secondDice = Math.floor(Math.random() * 6) + 1;
        this.move = this.firstDice + this.secondDice;
        this.isDouble = this.firstDice === this.secondDice ? true : false; 
        document.querySelector(".dice1").innerHTML = `${this.firstDice}`;
        document.querySelector(".dice2").innerHTML = `${this.secondDice}`;
    }
}



export default Dices;