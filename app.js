// Gets new object
// The architechture allows us to not have to use the 'new' keyword here
var a = G$('yash', 'sharma');

// use our chainable methods
a.greet().setLang('es').greet(true).log();

// Set the function that executes when click event occurs
$('#login').click(function(event) {

	// hide the language selector once logged in
	$('#logindiv').hide();

	// get the new object with some fake data
	// assume that the data 'John Doe' is fetched by some server query
	var g = G$('John', 'Doe');

	// use chainable methods to first set the language and then inject the formal greeting
	g.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});

