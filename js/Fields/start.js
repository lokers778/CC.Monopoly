import Field from '../field';

class Start extends Field {
  constructor(name, truename) {
    super(name, truename);
  }

  giveReward(player) {
    player.updateMoney(200);
  }
}

export default Start;
