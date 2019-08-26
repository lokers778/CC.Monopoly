class Player {
  constructor(name, color) {
    this.name = name;
    this.money = 200;
    this.color = color;
    this.properties = [];
  }
  changeMoney(money) {
    this.money = money;
  }
  changeProperties(properties) {
    this.properties = properties;
  }
}
