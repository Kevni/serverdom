var E = require('../index').Element;

var example = E('span', ["Hello", E.BR(), 'World!'], {style: 'color:red;'});
		
console.log(example.toString());