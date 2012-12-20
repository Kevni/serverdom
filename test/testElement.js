var Assert = require('assert');
var DOM = require('../index');
var E = DOM.Element;

//Check if BR factory works correctly
(function() {
	var el = DOM.Element.BR();
	Assert.strictEqual(el.toString(), "<br />");
})();

//Check if create a simple empty element works
(function() {
	var el = E('div');
	Assert.strictEqual(el.toString(), "<div></div>");
})();

//Check if create a element with string content works
(function() {
	//A simple string
	var el = E('div', ["aaa"]);
	Assert.strictEqual(el.toString(), "<div>aaa</div>");
	
	//More than one string
	el = E('div', ["aaa", "bbb", "ccc"]);
	Assert.strictEqual(el.toString(), "<div>aaabbbccc</div>");
	
	//Strings with elements (from factory)
	el = E('div', ["aaa", DOM.Element.BR(), "ccc"]);
	Assert.strictEqual(el.toString(), "<div>aaa<br />ccc</div>");
	
	//Strings with elements (manuell created)
	el = E('div', ["aaa", E('span', ["bbb"]), "ccc"]);
	Assert.strictEqual(el.toString(), "<div>aaa<span>bbb</span>ccc</div>");
})();

//Check if create a element with attributes works
(function() {
	//One Attributes
	var el = E('a', {href: "google.de"});
	Assert.strictEqual(el.toString(), "<a href=\"google.de\"></a>");
	
	el = E('a', {href: "google.de", color: "blue", size:"15"});
	Assert.strictEqual(el.toString(), "<a href=\"google.de\" color=\"blue\" size=\"15\"></a>");
})();

//Check if the order of parameters correctly
(function() {
	//STRING content
	var el = E('a', "Google");
	Assert.strictEqual(el.toString(), "<a>Google</a>");
	
	//ARRAY content
	el = E('a', ["Google"]);
	Assert.strictEqual(el.toString(), "<a>Google</a>");
	
	//ARRAY with more values content
	el = E('a', ["Google", "Mail"]);
	Assert.strictEqual(el.toString(), "<a>GoogleMail</a>");
	
	//ATTRIBUTES without content
	el = E('a', {href: "http://google.de"});
	Assert.strictEqual(el.toString(), "<a href=\"http://google.de\"></a>");
	
	//ATTRIBUTES with content
	el = E('a', "Google", {href: "http://google.de"});
	Assert.strictEqual(el.toString(), "<a href=\"http://google.de\">Google</a>");
	
	el = E('a', ["Google", "Mail"], {href: "http://mail.google.de"});
	Assert.strictEqual(el.toString(), "<a href=\"http://mail.google.de\">GoogleMail</a>");
})();

//Check if templates can be load
(function() {
	//STRING content
	var el = DOM.Load("./testTemplate.json", true);
	Assert.strictEqual(el.toString(), 
				"<html><head><title>Meine Website</title><script src=\"http://jquery.com\" />"
			+	"</head><body><span>Hallo<br />Welt!<hr />Footer</span></body></html>");
	
	//Load content to element
	el = E("html");
	
	el = DOM.Load("./testBody.json", el);
	Assert.strictEqual(el.toString(), 
				"<html><body><span>Hallo Welt!</span></body></html>");
	
	
})();















