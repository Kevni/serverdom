var _  = require('underscore');
var _s = require('underscore.string');

var shortTags = require('../configs/shortTags.json');

var Element = (function() {
    /**
     * Konstruktor
     * @param tag
     * @param attr
     * [ @param content ]
    */
	function Element(tag, paramA, paramB) {
		if (_.isUndefined(tag)) {
			return new Error("Kein Tag angegeben");
		}
      
		//Standardwerte
		var content = [];
		var attr 	= {};
		
		//Wenn nur ein Parameter angegeben
		if (!_.isUndefined(paramA) && _.isUndefined(paramB)) {
			if (_.isArray(paramA)) { //Dann Content
				content = paramA;
			}
			else if (_.isString(paramA)) {
				content = [ paramA ];
			} 
			else if (_.isObject(paramA)) { //sonst Attribute 
				attr = paramA;
			}
			else {
				return new Error("Ungültiger Parameter!");
			}
		}
		//Wenn Beide gegeben
		else if (!_.isUndefined(paramA) && !_.isUndefined(paramB)) {
			if (!_.isArray(paramA) && !_.isString(paramA)) {
				return new Error("Paramater A (Content) muss ein Array|String sein");
			}
			
			if (!_.isObject(paramB)) {
				return new Error("Paramater B (Attribute) muss ein Objekt sein");
			}
		
			content = _.isString(paramA) ? [ paramA ] : paramA;
			attr 	= paramB;
		}
  
		this._tag     = tag;
		this._short   = _.indexOf(shortTags, tag) != -1;//Ist ShortTag? (<br />)
		this._attr    = attr;
		this._content = content;
    }
   
	/**
	 * Tag des Element
	 */
	this._tag;
	
	/**
	 * Attribute des Element
	 */
	this._attr;
	
	/**
	 * Content des Element
	 */
	this._content;
   
   
    /**
     * Getter/Setter für Attribute
     * @param key 
     * [@param val]
	 * @return this
	 */
	Element.prototype.attr = function(key, val) {
		if (_.isObject(key)) {
			this._attr = key;
			return this;
		}
   
		if (_.isUndefined(val)) {
			return this._attr[key];
		}
   
		this._attr[key] = val;
		return this;
	}
   
	/**
	* Getter/Setter für Content
	* [@param content]
	*/
	Element.prototype.content = function(content) {
		if (_.isUndefined(content)) {
			return this._content;
		}
		
		this._content = content;
		return this;
	}
	
	/**
	 * Generiert HTML Code der das Objekt repräsentiert
	 */
	Element.prototype.toString = function() {         
		//Erzeuge Attribute-String
		var attrStr = "";
		if (_.isObject(this._attr)) {
			_.each(this._attr, function(val, key) {
				attrStr += key + '="'+ val +'" ';
			});
			
			if (attrStr.length > 0) {
				attrStr = " " + _s.trim(attrStr);
			}
		}
		
		//Wenn Short Element kleines Tag zurückgeben
		if (this._short) {
			return '<'+ this._tag + attrStr +' />';
		}
		
		//Bearbeite verschachtelte Elemente
		var contentStr = "";
		if (_.isArray(this._content)) {
			_.each(this._content, function(val) {
				contentStr += val.toString();
			});
		}
		else if (_.isString(this._content)) {
			contentStr = this._content;
		}
		
		return '<'+ this._tag + attrStr +'>' + contentStr +'</'+ this._tag +'>';
	}
	
	
	return Element;
	
})();

/**
 * Factory zum einfacheren Bauen eines Elements
 */
module.exports = function (tag, paramA, paramB) {
	return new Element(tag, paramA, paramB);
};

//Klasse wird trotzdem exportiert
module.exports.Class = Element;

//Factory BR
module.exports.BR = function() { 
	return new Element("br"); 
};

//Fatory HR
module.exports.HR = function() { 
	return new Element("hr"); 
};

//Factory Javascripts
module.exports.SCRIPT = function(file) { 
	return new Element(
					"script", 
					{src: file, type: "text/javascript"}
	); 
};

//Factory Anker
module.exports.A = function(link, cont) { 
	return new Element(
					"a", 
					[ (cont ? cont : link) ],
					{href: link}
	); 
};
