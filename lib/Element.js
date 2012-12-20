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
   function Element(tag, options) {
      if (_.isUndefined(tag)) {
         return Error("Kein Tag angegeben");
      }
      
      //Bei Stringparamater
      if (_.isArray(options)) {
         options = {content: options};
      }
      
      //Setzt Standardwerte
      options = _.defaults(options ? options : {}, {attr : {}, content : ""});
  
      this._tag     = tag;
      this._short   = _.indexOf(shortTags, tag) != -1;//Ist ShortTag? (<br />)
      this._attr    = options.attr;
      this._content = options.content;
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
    */
   Element.prototype.attr = function(key, val) {   
      if (_.isUndefined(val)) {
         return this._attr[key];
      }
   
      this._attr[key] = val;
   }
   
   /**
    * Getter/Setter für Content
    * [@param content]
    */
   Element.prototype.html = function(content) {
      if (_.isUndefined(content)) {
         return this._content;
      }
      
      this._content = content;
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
      }
      
      //Wenn Short Element kleines Tag zurückgeben
      if (this._short) {
         return '<'+ this._tag +' '+ _s.trim(attrStr) +' />';
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
      
      return '<'+ this._tag +' '+ _s.trim(attrStr) +'>'+ contentStr +'</'+ this._tag +'>';
   }
   
   
   return Element;

})();

module.exports = Element;
module.exports.BR = function() { return new Element("br"); };
module.exports.HR = function() { return new Element("hr"); };
module.exports.SCRIPT = function(file) { return new Element("script", {attr: {src: file, type: "text/javascript"}}); };
module.exports.A = function(link, cont) { return new Element("a", {attr: {href: link}, content: [ (cont ? cont : link) ]}); };