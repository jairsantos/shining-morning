﻿/*
    Descricao: [implementa ao construtor de Array 
    o método de filtragem de JSON através de lambda expression]
*/
//function to turn lambda expressions into Javascript functions
function lambda(l) {
    var fn = l.match(/\((.*)\)\s*=>\s*(.*)/);
    var p = [];
    var b = "";

    if (fn.length > 0) fn.shift();
    if (fn.length > 0) b = fn.pop();
    if (fn.length > 0) p = fn.pop()
    .replace(/^\s*|\s(?=\s)|\s*$|,/g, '').split(' ');

    // prepend a return if not already there.
    fn = ((!/\s*return\s+/.test(b)) ? "return " : "") + b;

    p.push(fn);

    try {
        return Function.apply({}, p);
    }
    catch (e) {
        return null;
    }
}

Array.prototype.where =
   function (f) {
       var fn = f;
       // if type of parameter is string         
       if (typeof f == "string")
       // try to make it into a function
           if ((fn = lambda(fn)) == null)
           // if fail, throw exception
               throw "Syntax error in lambda string: " + f;
       // initialize result array
       var res = [];
       var l = this.length;
       // set up parameters for filter function call
       var p = [0, 0, res];
       // append any pass-through parameters to parameter array               
       for (var i = 1; i < arguments.length; i++) p.push(arguments[i]);
       // for each array element, pass to filter function
       for (var i = 0; i < l; i++) {
           // skip missing elements
           if (typeof this[i] == "undefined") continue;
           // param1 = array element             
           p[0] = this[i];
           // param2 = current indeex
           p[1] = i;
           // call filter function. if return true, copy element to results            
           if (!!fn.apply(this, p)) res.push(this[i]);
       }
       // return filtered result
       return res;
   }