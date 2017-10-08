const { Entity } = require('./entity.class.js');
class Human extends Entity {
  constructor(){
    super() // call constructor of Entity
    this.psy_x = (Math.floor(Math.random() * 100) + 1 )
    this.psy_y = (Math.floor(Math.random() * 100) + 1 )

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
        [.001, 160, 200]  // 100%  | 160 - 200	hochbegabt.	0,001% Extrem begabt
      ]
    );
  }
}
exports.Human = Human
