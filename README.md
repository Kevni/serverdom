ServerDOM
=========
Ich bin derzeit dabei ein Framework zu schreiben, mit dem man den Content einer Website
per Websocket nachlädt. Grundgerüst soll dabei ein DOM sein der zwischen Client und Server bei 
Änderungen synchronisiert wird. Dieses Projekt stellt diesen DOM dar.

Beispiele
=========
```javascript
var E = require('serverdom').Element;
var el = E('span', ["Hello", E.BR(), 'World!'], {style: 'color:red;'});
console.log(el.toString());
```
Ausgabe: 
```html
<span style="color:red;">Hallo<br />Welt!</span>
```
