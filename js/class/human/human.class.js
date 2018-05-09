const { Work } = require('./human.work.class.js');
class Human extends Entity {
  constructor(grid_x=0,grid_y=0){
    super() // call constructor of Entity
    this.age = 0; // multiplikator for health loss
    this.kcal = 3000; // % when > 1000 sleeps refreshs energy
    this.energy = 100; // % regain energy with sleep when kcal is > 1000
    this.temperature = 37; // 37c damge if below or up
    this.health = 100 // %
    this.money = 0 // used to buy food
    this.food = 0; // kcal durch. 3000

    //Other Details:
    // gender 1:woman, 2:man
    this.sex = getNumber(
      [
        //chance, min, max
        [.51 ,1 ,1],   // 1: woman 51%
        [.49 ,2 ,2],   // 2: man 49%
      ]
    );
    this.sexOrientation = getNumber( // if homo no child can be born
      [
        //chance, min, max
        [.90 ,1 ,1],   // 1: hetero 90%
        [.10 ,2 ,2],   // 2: homo 10%
      ]
    );
    // Generate the IQ of the Human manipulates work
    this.iq = getNumber(
      [
        //chance, min, max
        [.022 ,40 ,70],   // -50%  | 40 - 70	Weit unterdurchschnittlich 2,2%
        [.067 ,71 ,79],   // -25%  | 71 - 79	unterdurchschnittlich	6,7%
        [.161 ,80 ,89],   // -10%  | 80 - 89	etwas unterdurchschnittlich	16,1%
        [.50  ,90 ,109],  //  0%   | 90 - 109	Durchschnitt	50%
        [.16  ,110,119],  //  10%  | 110 - 119	hoch	16,1%
        [.067 ,120,129],  //  25%  | 120 - 129	sehr hoch	6,7%
        [.022 ,130,159],  //  50%  | 130 - 159	hochbegabt.	2,2%
        [.001 ,160, 200]  // 100%  | 160 - 200	hochbegabt.	0,001% Extrem begabt
      ]
    )
    this.psy_x = (Math.floor(Math.random() * 100) + 1 ) - (this.iq / 4); if(this.psy_x < 0) this.psy_x=0;
    this.psy_y = (Math.floor(Math.random() * 100) + 1 )
    /*
    1|A: Komplexe Arbeit | max psy_x<50, max psy_y<50
    2|D: Kreative Arbeit | min psy_x>50, max psy_y<50
    3|B: Noramle Arbeit  | max psy_x<50, min psy_y>50
    4|C: Einfache Arbeit | min psy_x>50, min psy_y>50
    */
    if(this.psy_x<=50 & this.psy_y<=50) this.psy_profile=1;  // A
    if(this.psy_x>=50 & this.psy_y<=50) this.psy_profile=2;  // D
    if(this.psy_x<=50 & this.psy_y>=50) this.psy_profile=3;  // B
    if(this.psy_x>=50 & this.psy_y>=50) this.psy_profile=4;  // C

    // Generate the Milieu the human is
    this.SinusMilieu = getNumber(
      [
        //chance, min, max
        [.09 ,1 ,1],   // 1: Etablierte 9%
        [.09 ,2 ,2],   // 2: Performer 9%
        [.06 ,3 ,3],   // 3: Konservative 6%
        [.09 ,4 ,4],   // 4: Postmaterielle 9%
        [.14 ,5 ,5],   // 5: Buergerliche Mitte 14%
        [.12 ,6 ,6],   // 6: Adaptiv-Pragmatische 12%
        [.08 ,7 ,7],   // 7: Digitale Individualisten 8%
        [.13 ,8 ,8],   // 8: Traditionelle 13%
        [.09 ,9 ,9],   // 9: Konsumorientierte Basis 9%
        [.11 ,10, 10]  // 10: Hedonisten 11%
      ]
    );
    /*
    generate in wich sozial Lazer and wich base Orientation the human has
    sozialLayer:
      1 Oberschicht
      2 Mitlere Schicht
      3 Unterschicht
    baseOrientaion:
      1:A Traditionelle
      2:B Modernisierung
      3:C Neuorientierung
    */
    switch (this.SinusMilieu) {
      case 1: this.sozialLayer = 1; this.baseOrientaion = 2; break;
      case 2: this.sozialLayer = 1; this.baseOrientaion = 3; break;
      case 3: this.sozialLayer = 2; this.baseOrientaion = 1; break;
      case 4: this.sozialLayer = 2; this.baseOrientaion = 2; break;
      case 5: this.sozialLayer = 2; this.baseOrientaion = 2; break;
      case 6: this.sozialLayer = 2; this.baseOrientaion = 3; break;
      case 7: this.sozialLayer = 2; this.baseOrientaion = 3; break;
      case 8: this.sozialLayer = 3; this.baseOrientaion = 1; break;
      case 9: this.sozialLayer = 3; this.baseOrientaion = 2; break;
      case 10: this.sozialLayer = 3; this.baseOrientaion = 3; break;
    }

    /*
    //Position obj and visio
    var position_xy = Animation.grid.getPosition(grid_x+','+grid_y);
		this.group = Animation.addGroup()
		//this.scan = Animation.addGroup()
		this.group.position.set(position_xy[0], 0, position_xy[1])
		//this.scan.position.set(position_xy[0], 0, position_xy[1])
    Animation.addPoint(this.group,position_xy[0],position_xy[1],0,100)
		//Animation.addMeshBox(this.scan,position_xy[0] + (Animation.grid.gridsize/2),10,position_xy[1] + (Animation.grid.gridsize/2),10,10,10,0x0000ff)
		this.last_obj = Animation.grid.grid[grid_x][grid_y];
    */
  }

  /**
   * regain Energy but stop working (%)
   */
  sleep(){
    multi = 0;
    if (this.age > 50) {
      multi+=1
      if (this.age > 100) {
        multi+=1
      }
    }
    if (this.kcal < 1000) {
      multi+=1
    }
    if (this.temperature < 37 || this.temperature > 37) {
      multi+=1
    }
    if (this.health < 50) {
      multi+=1
    }
    // Calc energy regained with the multiplikator (sleep time)
    this.energy

  }

  calcHealth(){

  }
}
exports.Human = Human
