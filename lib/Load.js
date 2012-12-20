var _ = require("underscore");
var path = require('path');
var Element = require("./Element");

function createElement(el) {
   if (_.isString(el)) {
      return el;
   }

   var X = new Element(el.tag, {attr: (el.attr ? el.attr : {})});
   
   if (!_.isUndefined(el.content)) {
      var cont = [];
      _.each(el.content, function(value) {
         cont.push( createElement(value) );
      });
      
      X.html(cont);
   }

   
   return X;
}

module.exports = function(file) {
   var tmpl = require( path.dirname(require.main.filename) + '/' + file );
   
   var cont = [];
   _.each(tmpl, function(value) {
      cont.push( createElement(value) );
   });
   
   return cont;
};