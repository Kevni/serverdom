ServerDOM
=========
Ich bin derzeit dabei ein Framework zu schreiben, mit dem man den Content einer Website
per Websocket nachlädt. Grundgerüst soll dabei ein DOM sein der zwischen Client und Server bei 
Änderungen synchronisiert wird. Dieses Projekt stellt diesen DOM dar.

Installation:

    npm install serverdom
    
Test (welcher einen guten Einblick in die Funktionsweise bietet):

    npm test serverdom

Beispiele
=========
Achtung: Die Beispiele können sich mehrmals ändern, da ich garantiert noch ein paar Methoden abändern werde. 
```javascript
var E = require('serverdom').Element;
      // E(htmltag [, content-array, attributen-objekt] )
var el = E('span', ["Hello", E.BR(), 'World!'], {style: 'color:red;'});
console.log(el.toString());
```
Als Template-Datei:
```javascript
 ["body", [
  	  ["span", [
          "Hello",
          ["br"],
          "World!"
        ], {
         "style": "color:red;" 
        }
      ]
	]
 ]
```
Ausgabe: 
```html
<body>
	<span style="color:red;">Hallo<br />Welt!</span>
</body>
```
