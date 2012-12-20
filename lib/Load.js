var _ = require("underscore");
var path = require('path');
var E = require("./Element");


/**
 * Erstellt ein Element anhand des Datenobjekt **el**
 * @param el
 * @return Element
 */
function createElement(el) {
	//Terminierung der Rekursion
	if (_.isString(el)) {
		return el;
    }
	
	var tag = el[0]; //Tag des Elements
	var content = [];
	var attr = {};
	
	//Erzeuge Element-Content
	function doRecursiv(arr) {
		_.each(arr, function(value) {
			content.push( createElement(value) ); // Rekursiv
		});
	}
	
	switch (_.size(el)) {
		case 2: { //nur Tag
			if (_.isObject(el[1]) && !_.isArray(el[1])) { //Attribut
				attr = el[1];
			}
			else if (_.isArray(el[1])) { //Content
				doRecursiv(el[1]);
			} 
			else if (_.isString(el[1])) {
				content = el[1];
			}
		}break;
		
		case 3: {
			doRecursiv(el[1]);
			attr = el[2];
		}break;
	}
	
	//Erstelle Element
	return E(tag, content, attr);
}

/**
 * Lädt das übergebene Template als DOM
 * @param file
 * [ @param option ]
 * @return Array
 */
module.exports = function(file, option) {
	var tmpl = require( path.dirname(require.main.filename) + '/' + file );
	
	
   
    //Parse Template
	var dom = [];
	_.each(tmpl, function(value) {
		dom.push( createElement(value) );
	});
   
	if (!_.isUndefined(option)) {
		//Gebe Root zurück
		if (_.isBoolean(option)) {
			if (_.size(dom) == 1) {
				return _.first(dom);
			}
			else {
				return new Error("Mehr als ein Wurzelelement vorhanden!");
			}
		}
		//Setze als content von **option**
		else if (option instanceof (E.Class)) {
			return option.content(dom);
		}
	}
   
	return dom;
};