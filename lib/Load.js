var _ = require("underscore");
var path = require('path');
var Element = require("./Element");


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

   //Erstelle "leeres" Element
   var X = new Element(el.tag, (el.attr ? el.attr : {}));
   
   //Erzeuge Element-Content
   if (!_.isUndefined(el.content)) {
      var cont = [];
      _.each(el.content, function(value) {
         cont.push( createElement(value) ); // Rekursiv
      });
      
      X.content(cont);
   }

   return X;
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
		else if (option instanceof Element) {
			return option.content(dom);
		}
	}
   
	return dom;
};