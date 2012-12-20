ServerDOM
=========
Ich bin derzeit dabei ein Framework zu schreiben, mit dem man den Content einer Website
per Websocket nachlädt. Grundgerüst soll dabei ein DOM sein der zwischen Client und Server bei 
Änderungen synchronisiert wird. Dieses Projekt stellt diesen DOM dar.

Beispiele
=========
```html
var DOM = require('serverdom');
var el = new DOM.Element('span', {
  content: ["Hallo", DOM.Element.BR(), "Welt!"],
  attr: {style: "color:red;"}
});
console.log(el.toString());

//Ausgabe: <span style="color:red;">Hallo<br />Welt!</span>
