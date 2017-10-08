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
    [.001 ,160, 200]  // 100%  | 160 - 200	hochbegabt.	0,001% Extrem begabt
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

1: Etablierte 9%
2: Performer 9%
3: Konservative 6%
4: Postmaterielle 9%
5: Buergerliche Mitte 14%
6: Adaptiv-Pragmatische 12%
7: Digitale Individualisten 8%
8: Traditionelle 13%
9: Konsumorientierte Basis 9%
10: Hedonisten 11%

*/
var number = getNumber(
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

--------------------
Soziale Lage:
1 Oberschicht
2 Mitlere Schicht
3 Unterschicht


Soziale Lage|Grundorientierung -> Sinus-Milieus
1|2 1: Etablierte 9%
1|3 2: Performer 9%
2|1 3: Konservative 6%
2|2 4: Postmaterielle 9%
2|2 5: Buergerliche Mitte 14%
2|3 6: Adaptiv-Pragmatische 12%
2|3 7: Digitale Individualisten 8%
3|1 8: Traditionelle 13%
3|2 9: Konsumorientierte Basis 9%
3|3 10: Hedonisten 11%

--------------------
Grundorientierung:
1|A: Traditionelle Werte
  Pflichterfuellung
  Ordnung

2|B: Modernisierung
  Individualisierung
  Selbstverwirklichung
  Genuss

3|C: Neuorientierung
  Multi-Optionalitaet
  Pragmatismus
  Refokussierung
  neue Synthesen

--------------------
Vier-Quadranten-Modell
1|A: Komplexe Arbeit
2|D: Kreative Arbeit
3|B: Noramle Arbeit
4|C: Einfache Arbeit

A: Komplexe Arbeit
  Faktisch
  Quantitativ
  Kritisch
  Rational
  Mathematisch
  Logisch
  Analytisch
D: Kreate Arbeit
  Kreativ
  Kuenstlerisch
  Intuitiv
  Ganzheitlich
  Aufbauend
  Simultan
  Raeumlich
B: noramle Arbeit
  Konservativ
  Kontrolliert
  Squentiell
  Detaliert
  Dominierend
  Verbal
  Leser
C: einfache Arbeit
  Emotional
  Musikalisch
  Spirituell
  Symbolisch
  Intuitiv
  Verbal
  Leser

*/
