import Field from '../field';
import colors from '../colors';

class Property extends Field {
  constructor(name, truename, color, special) {
    super(name, truename);
    this.color = color;
    this.special = special;
    switch (color) {
      case colors.BROWN:
        this.price = 60;
        this.costOfBuilding = 50;
        if (this.special) this.rent = [4, 20, 60, 180, 320, 450];
        //odpowiednio: zwykły czynsz, z 1 domem, z 2, z 3, z 4, z hotelem
        else this.rent = [2, 10, 30, 90, 160, 250];
        break;
      case colors.BLUE:
        this.costOfBuilding = 50;
        if (this.special) {
          this.price = 120;
          this.rent = [8, 40, 100, 300, 450, 600];
        } else {
          this.price = 100;
          this.rent = [6, 30, 90, 270, 400, 550];
        }
        break;
      case colors.PINK:
        this.costOfBuilding = 100;
        if (this.special) {
          this.price = 160;
          this.rent = [12, 60, 180, 500, 700, 900];
        } else {
          this.price = 140;
          this.rent = [10, 50, 150, 450, 625, 750];
        }
        break;
      case colors.ORANGE:
        this.costOfBuilding = 100;
        if (this.special) {
          this.price = 200;
          this.rent = [16, 80, 220, 600, 800, 1000];
        } else {
          this.price = 180;
          this.rent = [14, 70, 200, 550, 750, 950];
        }
        break;
      case colors.RED:
        this.costOfBuilding = 150;
        if (this.special) {
          this.price = 240;
          this.rent = [20, 100, 300, 750, 925, 1100];
        } else {
          this.price = 220;
          this.rent = [18, 90, 250, 700, 875, 1050];
        }
        break;
      case colors.YELLOW:
        this.costOfBuilding = 150;
        if (this.special) {
          this.price = 280;
          this.rent = [24, 120, 360, 850, 1025, 1200];
        } else {
          this.price = 260;
          this.rent = [22, 110, 330, 800, 975, 1150];
        }
        break;
      case colors.GREEN:
        this.costOfBuilding = 200;
        if (this.special) {
          this.price = 320;
          this.rent = [28, 150, 450, 1000, 1200, 1400];
        } else {
          this.price = 300;
          this.rent = [26, 130, 390, 900, 1100, 1275];
        }
        break;
      case colors.BLACK:
        this.costOfBuilding = 200;
        if (this.special) {
          this.price = 400;
          this.rent = [50, 200, 600, 1400, 1700, 2000];
        } else {
          this.price = 350;
          this.rent = [35, 175, 500, 1100, 1300, 1500];
        }
        break;
    }
  }
}
export default Property;
