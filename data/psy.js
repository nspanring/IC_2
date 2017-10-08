/*
IQ Arbeitsleistung (+1) und Sozialeleistung (-1):

-50%  | 40 - 70	Weit unterdurchschnittlich 2,2%
-25%  | 71 - 79	unterdurchschnittlich	6,7%
-10%  | 80 - 89	etwas unterdurchschnittlich	16,1%
 0%   | 90 - 109	Durchschnitt	50%
 10%  | 110 - 119	hoch	16,1%
 25%  | 120 - 129	sehr hoch	6,7%
 50%  | 130 - 159	hochbegabt.	2,2%
*/
function getNumber(probabilities){
    var rnd = Math.random();
    var total = 0;
    var hit;
    for(var i = 0; i < probabilities.length; i++){
      if(rnd > total && rnd < total + probabilities[i][0]){
           hit = probabilities[i]
      }
      total += probabilities[i][0];
    }
    return Number((hit[1] + (Math.random() * (hit[2] - hit[1]))).toFixed(2));
}

var number = getNumber(
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

console.log(number);
/*
-------------------
Arbeitskurve Urzeit abweichung von der Basis (100%):

6: -50%
8:  25%
10: 50%
12: 20%
14: 5%
16: 0%
18: 10%
20: 15%
22: 10%
0: -10%
2: -25%
4: -50%

--------------------
Die Sinus-Milieus:

Grundorientierung und Werte (Lebenseinstellung, Familie, Politik, Religion, etc.)
Lebensstil, Geschmack, Führungsstil
Kommunikationsstrukturen
Wohn- und Arbeitsbereichumfelder

Etablierte 9%
Performer 9%
Konservative 6%
Postmaterielle 9%
Buergerliche Mitte 14%
Adaptiv-Pragmatische 12%
Digitale Individualisten 8%
Traditionelle 13%
Konsumorientierte Basis 9%
Hedonisten 11%

--------------------
Soziale Lage:
Oberschicht
Mitlere Schicht
Unterschicht

--------------------
Grundorientierung:
A: Traditionelle Werte
  Pflichterfuellung
  Ordnung

B: Modernisierung
  Individualisierung
  Selbstverwirklichung
  Genuss

C: Neuorientierung
  Multi-Optionalitaet
  Pragmatismus
  Refokussierung
  neue Synthesen

--------------------
Vier-Quadranten-Modell

A:
  Faktisch
  Quantitativ
  Kritisch
  Rational
  Mathematisch
  Logisch
  Analytisch
D:
  Kreativ
  Kuenstlerisch
  Intuitiv
  Ganzheitlich
  Aufbauend
  Simultan
  Raeumlich
B:
  Konservativ
  Kontrolliert
  Squentiell
  Detaliert
  Dominierend
  Verbal
  Leser
C:
  Emotional
  Musikalisch
  Spirituell
  Symbolisch
  Intuitiv
  Verbal
  Leser

*/
