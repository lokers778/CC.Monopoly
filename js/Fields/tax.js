import Field from '../field';

class Tax extends Field {
    constructor(name, truename) {
        super(name, truename);
    }

    payTax(player) {
        if (this.truename === 'specialPayOne') player.updateMoney(-200);
        else if (this.truename === 'specialPayTwo') player.updateMoney(-100);
    }
}

export default Tax;