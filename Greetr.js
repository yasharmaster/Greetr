
// clever trick to use semicolon before the starting to prevent any disaster
// if the code included just before this one happens to miss out semicolons
;(function(global, $){

	// returns a new object created by Greetr.init method
	var Greetr = function(firstname, lastname, language){
		return new Greetr.init(firstname, lastname, language);
	};

	// list of supported languages, hidden within the scope of IIFE, and never directly accessible
	var supportedLangs = ['en', 'es'];

	// informal greetings
	var greetings = {
		en: 'Hello',
		es: 'Hola'
	};

	// formal greetings
	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	};

	// logger messages
	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	};

	// prototype holds all the methods visible outside the scope of this IIFE
	// this saves memory space since eac object doesn't need to have a separate copy of functions
	Greetr.prototype = {

		// this refers to the calling object at the execution time
		fullName: function(){
			return this.firstname + ' ' + this.lastname;
		},

		validate: function() {
			// checks if given language is a supported one
			// references the externally inaccessible 'supportedLangs' within the closure
			if (supportedLangs.indexOf(this.language) === -1){
				throw "Invalid Language";
			}
		},

		// retrieve the messages from object by referring to properties using [] syntax
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstname + '!';
		},

		formalGreeting: function(){
			return formalGreetings[this.language] + ', ' + this.fullName();
		},

		// returns formal/informal greetings depending upon the parameter passed
		// chainable method returns their own containing object
		greet: function(formal){
			var msg;

			// if undefined or null it will be coerced to false
			if(formal){
				msg = this.formalGreeting();
			}
			else{
				msg = this.greeting();
			}

			if(console){
				console.log(msg);
			}

			// 'this' refers to the calling object at execution time
			// makes the method chainable
			return this;
		},

		log: function(){
			if(console){
				console.log(logMessages[this.language] + ': ' + this.fullName());
			}

			// makes chainable
			return this;
		},

		setLang: function(lang){

			// set the language
			this.language = lang;
			
			// validate
			this.validate();

			// makes chainable
			return this;
		},

		HTMLGreeting: function(selector, formal){
			if(!$){
				throw 'jQuery not loaded';
			}

			if(!selector){
				throw 'Missing jQuery selector';
			}

			// determine the message
			var msg;
			if (formal){
				msg = this.formalGreeting();
			}
			else{
				msg = this.greeting();
			}

			// find the dom element by passing the selector to jQuery and inject the message to
			// to the chosen place in DOM
			$(selector).html(msg);

			// make chainable
			return this;
		}
	};

	// the actual object is created here, allowing us to create an object without 
	// calling 'new' explicitly
	Greetr.init = function(firstname, lastname, language){
		
		var self = this;
		this.firstname = firstname || "";
		this.lastname = lastname || "";
		this.language = language || "en";

		self.validate();
	};

	// sets the prototype of all the objects created by Greetr.init method to the
	// Greetr.protoype object
	Greetr.init.prototype = Greetr.prototype;

	// Attach Greetr to the global object and provide a shorthand 'G$()'
	// for decreasing the code to be typed
	global.Greetr = global.G$ = Greetr;

}(window, jQuery));