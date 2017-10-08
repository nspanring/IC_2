const { Entity } = require('./entity.class.js');
class Human extends Entity {
  constructor(){
    super() // call constructor of Entity
    this.age = 0;
    // gender 1:woman, 2:man
    this.sex = getNumber(
      [
        //chance, min, max
        [.51 ,1 ,1],   // 1: woman 51%
        [.49 ,2 ,2],   // 2: man 49%
      ]
    );
    this.sexOrientation = getNumber(
      [
        //chance, min, max
        [.90 ,1 ,1],   // 1: hetero 90%
        [.10 ,2 ,2],   // 2: homo 10%
      ]
    );
    // Generate the IQ of the Human
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
  }
}
exports.Human = Human
