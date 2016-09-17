// JavaScript

//
// primitive types
//

var x = "Primitive types store literal values.";
var y = x;
x = "Changed the value";
console.log(y); // Primitive types store literal values.

//
// reference types
//

var u = {}; // equivalent to new Object()
var v = u;
u.myProperty = "Reference types store pointers to objects.";
console.log(v.myProperty); // Reference types store pointers to objects.
u = null;
console.log(v.myProperty); // Reference types store pointers to objects.

var z = {};
z = null; // if you are done with a reference type and want to free its memory, set to null

// other types
var items = []; // equivalent to new Array()
var now = new Date();
var error = new Error("something bad happened");
var func = new Function("console.log('hello');");
var re = new RegExp("\\d+");

//
// object literal
//

var book = {
    title: "The Principles of Object-Oriented JavaScript" ,
    year: 2014,
    "ebook format": "epub"
};

console.log(book.title);
console.log(book['year']);
console.log(book['ebook format']);

console.log(book instanceof Object);

//
// array literal
//

var colors = ["red", "blue", "green"];

console.log(colors[0]);

console.log(Array.isArray(colors)); // supported in most places

console.log(colors instanceof Object);
console.log(colors instanceof Array);

//
// function literal
//

function foo(value) {
    console.log(value);
}

console.log(foo instanceof Object);
console.log(foo instanceof Function);

//
// regular expression literal
//

var numbers = /\d+/g;

console.log(numbers instanceof RegExp);

//
// functions
//

console.log(inc(2)); // function declarations are hoisted to the top of the context

function inc(num) { return num + 1; }           // function declaration
var dec = function(num) { return num - 1; };    // function expression

function args() {
    console.log("given " + arguments.length + " arguments");
}
console.log(args.length);   // function's arity = number of arguments expected
args(1, 2);                 // given 2 arguments

// preferred way to check for optional arguments
function say(what) {
    if (typeof what === "undefined") {
        console.log("nothing");
    } else {
        console.log(what);
    }
}
say();          // nothing
say("Winnie");  // Winnie

//
// this
//

// global scope
this.abc = "123";
console.log(typeof window.abc !== "undefined");
console.log(this.abc === window.abc);
console.log(this.abc === abc);

// function scope
function thisTest(value) {
    this.test = value;
}
thisTest("foo");
console.log(test === "foo");

// object's function scope
var person = {
    age: 0,
    birthday: function() {
        this.age = this.age + 1;
    }
}
person.birthday();
console.log(person.age); // 1
console.log(typeof this.age === "undefined")

// "this" is set when the function is called
var obj = {};
obj.thisTest = thisTest;
obj.thisTest("bar");
console.log(obj.test === "bar");
console.log(test === "foo");

// call
var obj1 = {};
thisTest.call(this, "foo 1");
thisTest.call(obj1, "foo 2");
console.log(this.test === "foo 1");
console.log(obj1.test === "foo 2");

// apply
var obj2 = {};
thisTest.apply(this, ["foo 3"]); // like call(), but accepts an array of arguments
thisTest.apply(obj2, ["foo 4"]);
console.log(this.test === "foo 3");
console.log(obj2.test === "foo 4");

// bind
var obj3 = {};
var obj4 = {};
thisTest.bind(obj3)("foo 5"); // bind returns a new function
console.log(obj3.test === "foo 5");
thisTest.bind(obj4, "foo 6")();
console.log(obj4.test === "foo 6");

//
// objects
//

var obj10 = {};
obj10.name = "foo";         // put
obj10.func = function() {}; // put
console.log("name" in obj10 === true);
console.log("func" in obj10 === true);
console.log("title" in obj10 === false);
console.log(obj10.hasOwnProperty("name") === true);
console.log(obj10.hasOwnProperty("func") === true);
console.log("toString" in obj10 === true);
console.log(obj10.hasOwnProperty("toString") === false);

delete obj10.name;
console.log("name" in obj10 === false);

// Object.keys returns only own property names
console.log(Object.keys({}));               // []
console.log(Object.keys({name: "foo"}));    // ["name"]

//
// object properties
//

var obj11 = {
    _name: "Corey",
    get name() {
        console.log("reading name");
        return this._name;
    },
    set name(value) {
        console.log("setting name");
        this._name = value
    }
}
console.log(obj11.name);    // reading name
                            // Corey
obj11.name = "Molly";       // setting name
console.log(obj11.name);    // reading name
                            // Molly

// managing properties

var obj12 = {};
Object.defineProperty(obj12, "name", {
    value: "Corey",
    enumerable: true,
    configurable: true,
    writable: true
});
console.log(obj12.name === "Corey");

var descriptor = Object.getOwnPropertyDescriptor(obj12, "name");
console.log(descriptor.value === "Corey");
console.log(descriptor.writable === true); // and others

// lock down properties

Object.preventExtensions({});   // new properties cannot be added
Object.seal({});                // data can change but properties cannot (whether read-only, etc.)
Object.freeze({});              // nothing about an object can change

//
// constructors
//

function Doodad() {}
var doodad = new Doodad; // can omit parentheses if there are no parameters
console.log(doodad instanceof Doodad); // this is preferred
console.log(doodad.constructor === Doodad);

function Pokemon(name) {
    this.name = name;
    this.talk = function() {
        console.log(this.name);
    };
}
var poke1 = new Pokemon("pikachu");
console.log(poke1.name === "pikachu");
var poke2 = Pokemon("clefairy"); // do not forget the "new" keyword
console.log(typeof poke2 === "undefined");
console.log(name === "clefairy");

//
// prototypes
//

console.log(Object.prototype === Object.getPrototypeOf({}));
console.log(Object.prototype.isPrototypeOf({}));

var obj20 = {};
obj20.toString = function() {return "ok";};
delete obj20.toString; // can delete own properties only

// custom prototype
function Widget(name) {
    this.name = name;
}
Widget.prototype.doThing = function() {
    console.log("%s is ready", this.name);
};
var widget1 = new Widget("Mabel");
widget1.doThing();
// but remember that prototypes are shared
// so an object or array on the prototype might not make sense

// can define all prototype methods at once
function Gadget(name) {
    this.name = name;
}
Gadget.prototype = {
    constructor: Gadget, // otherwise constructor field will be overwritten
    doThing: function() {
        console.log("%s is ready", this.name);
    },
    toString: function() {
        return "Gadget " + this.name;   
    }   
};
var gadget1 = new Gadget("Mabel");
gadget1.doThing();
console.log(gadget1.toString() === "Gadget Mabel");
console.log(gadget1.constructor === Gadget);

// can change the prototype of frozen objects
var gadget2 = new Gadget("Painter");
Object.freeze(gadget2);
Gadget.prototype.jump = function() { console.log(this.name + " is jumping!"); };
gadget2.jump();
gadget1.jump();

//
// prototype chaining (inheritance)
//

function Dog(breed, name) {
    this.breed = breed;
    this.name = name;
}
var dog1 = new Dog("Lab mix", "Wendy");
var dog2 = new Dog("Pom", "Winnie");
console.log(dog1 < dog2 === false); // valueOf is called when objects are used with operators
Dog.prototype.valueOf = function() { return this.name + ", " + this.breed; };
console.log(dog1 < dog2 === true);

// if valueOf returns a reference value, then toString is called instead
// valueOf returns an object by default
delete Dog.prototype.valueOf;
Dog.prototype.toString = function() { return this.name + ", " + this.breed; };
console.log(dog1 < dog2 === true);

// inheritance
var plant1 = {
    species: "dandelion",
    blossom: function() {
        console.log("This %s is flowering.", this.species);
    }
};
var plant2 = Object.create(plant1, {
    species: {
        value: "daisy",
        configurable: true,
        enumerable: true,
        writable: true
    }
});
plant1.blossom();
plant2.blossom();

var lookupHash = Object.create(null); // has no prototype (not even Object.prototype)

// can change the prototype of an object
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};
Rectangle.prototype.toString = function() {
    return "[Rectangle " + this.length + "x" + this.width + "]";
};
function Square1(size) {
    this.length = size;
    this.width = size;
};
Square1.prototype = new Rectangle();     // don't need the arguments
Square1.prototype.constructor = Square1;  // need to reset the constructor property
Square1.prototype.toString = function() {
    return "[Square1 " + this.length + "x" + this.width + "]";
};
var rect = new Rectangle(5, 10);
var square1 = new Square1(6);
console.log(rect.getArea());
console.log(square1.getArea());
console.log(rect.toString());
console.log(square1.toString());
console.log(rect instanceof Rectangle);
console.log(rect instanceof Object);
console.log(square1 instanceof Square1);
console.log(square1 instanceof Rectangle);
console.log(square1 instanceof Object);

// can simplify this to
function Square2(size) {
    this.length = size;
    this.width = size;
}
Square2.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        value: Square2,
        configurable: true,
        enumerable: true,
        writable: true
    }
});
// in this example, the Rectangle constructor is not called
Square2.prototype.toString = function() {
    return "[Square2 " + this.length + "x" + this.width + "]";
};

// do not need to call the Rectangle constructor
// but you can
function Square3(size) {
    Rectangle.call(this, size, size);
}
Square3.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        value: Square3,
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Square3.prototype.toString = function() {
    return "[Square3 " + this.length + "x" + this.width + "]";
};
var square3 = new Square3(6);
console.log(rect.getArea());
console.log(square3.getArea());
console.log(rect.toString());
console.log(square3.toString());
console.log(rect instanceof Rectangle);
console.log(rect instanceof Object);
console.log(square3 instanceof Square3);
console.log(square3 instanceof Rectangle);
console.log(square3 instanceof Object);

// use call or apply to invoke supertypes' methods
Square3.prototype.toString = function() {
    var text = Rectangle.prototype.toString.call(this);
    return text.replace("Rectangle", "Square3");
};
console.log(square3.toString());

//
// patterns
//

// module pattern (privileged methods)
var obj30 = (function() {
    // private data
    return {
        // public methods/fields
    }
}());

// revealing module pattern
// declare everything in the private section, and return references to the public stuff only
var obj31 = (function() {
    // methods/data
    var age = 0;
    function getAge() {
        return age;
    }
    return {
        // public stuff
        name: "Baby",
        getAge: getAge
    }
}());

// private fields on classes
function Trinket(name) {
    var age = 0;        // this is private
    this.name = name;   // this is public
    this.getAge = function() {
        return age;     // the method access the private field
    };
}

// share some private data across all instances
var Thing = (function() {
    var age = 0;        // this is private
    
    function InnerThing(name) {
        this.name = name;
    }
    InnerThing.prototype.getAge = function() {
        return age;     // the method access the private field
    };
    return InnerThing;
}());
var thingInstance = new Thing("foo");

//
// mixins
//

// use a function to copy properties
// XXX: this doesn't work for accessor properties :(
function mixin_simple(receiver, supplier) {
    var property;
    for (property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property]; // shallow copy
        }
    }
    return receiver;
}

// use this more robust function for mixins
// XXX: works with only ES5; combine the two functions for older browsers
function mixin(receiver, supplier) {
    // TODO: use Object.getOwnPropertyNames to copy nonenumerable properties?
    Object.keys(supplier).forEach(function(property) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
        Object.defineProperty(receiver, property, descriptor);
    });
    return receiver;
}

// example usage:
function EventTarget() {
    // event handling stuff
}
function Bird(feathers) {
    this.feathers = feathers;
}
mixin(Bird.prototype, new EventTarget());
mixin(Bird.prototype, {
    constructor: Bird,
    squawk: function() {
        console.log("squawking with all %s feathers", this.feathers);
        // use some function from EventTarget....
    }
});
var crow = new Bird("black");

// a quicker way without inheritance:
var obj32 = mixin(new EventTarget(), {
    name: "My name",
    talk: function() {
        console.log("%s says hi", this.name);
    }
});

//
// scope-safe constructors
//

function Whatsit(name) {
    if (this instanceof Whatsit) {
        this.name = name;
    } else {
        return new Whatsit(name);
    }
}
var whatsit1 = new Whatsit("Corey");
var whatsit2 = Whatsit("Molly");        // no "new" keyword
console.log(whatsit1.name === "Corey");
console.log(whatsit2.name === "Molly");

