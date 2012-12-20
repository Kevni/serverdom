var DOM = require('../index');

var el = new DOM.Element("span", ["Hallo Welt", DOM.Element.BR(),"Wie gehts dir?", DOM.Element.A("http://jquery.com", "Jquery")]);


console.log(el.toString());