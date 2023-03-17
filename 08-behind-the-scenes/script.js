"use strict";
/* 
////////////////// SCOPE AND SCOPE CHAIN
Scope:
    Space or environment in which a certain variable is declared. There is global scope, function scope, and block scope

GLOBAL SCOPE:
    the variable outside any function or block
    variable declared in global scope are accessible everywhere

FUNCTION SCOPE:
    variable are accessible only inside the function, NOT outside
    also called local scope

BLOCK SCOPE:
    variable are accessible only inside block
    HOWEVER, it applied to only let, and const variables
    function are also called block scope (only in strict mode)

SCOPE CHAIN:
scope can access to variables from all outer scopes

let and const: block scope
var: function scope

chiren scope can access all variable of parent, granparent scope, but not for the opposite site

*/
const lev1 = "Tran";

const func1 = function () {
  const lev2 = "Tran lev2";
  func1_sub();

  function func1_sub() {
    if (true) {
      const lev3 = "Tran lev3";
      var lev31 = "Tran lev31";
    }
    console.log(lev2);
    // console.log(lev3);
    console.log(`${lev31}`);
  }
};
func1();
/* Concurrency model: 
    how the js engine haldes multiple tasks happening at the same time.    
        ??? Why do we need thatJS runs in one single thread, so it can only do one thing at a time.    
        ??? So what about a long-running taskSound like it would block the single thread. However, we want to non-blocking behavior    
        ??? How do we achieve thatBy using an event loop: takes long running tasks, executes them in the background, and puts them back in the main thread once they are finished.
 */

/* 
//////////////////////////////////// THE JS ENGINE AND RUNTIMECALL STACK:    
where our code is executed (execution context)HEAP:    
    object in memory    
    where object are stored
    COMPILATION:    
        Entire code is converted into machine code at once, and write to a binary file that can be executed by a computer.
    INTERPRETATION:     
        Interpreter runs through the source code and executes it line by lineInterpreted language is much much slower than complier languagesThe mordern JS combine 2 type of language: 
            compilation and interpretation-> Just-in-time (JIT) compilation:     Entire code is converted into machine code at once, then executed immediately.    
            But does not create a portable file to execute, and the execution happens immediately after a compilationJS runtime include the CALLBACK QUEUECALLBACK QUEUE:    
                this is a data structure that contains all the callback function that re ready to be executed.     
                when the user click to the button, the function of handle click button will be push to the callback queue,    then when the call stack is empty, the callback function is passed to the call stack, so that can be executed
*/

/* /////////////////////////////////////////// EXECUTION CONTEXT AND CALL STACK
In the compilation process: creation of global execution context (for top-level code - the code not inside any function)function should only be executed when they are called.
    EXECUTION CONTEXT:    
    The environment in which a piece of javascript is executed. Store all the necessary information for some code to be executed    
    JS code always run inside the execution context        
    In the one JavaScript project, there is only one global execution context. It's always there as the default context.Functions finally start to execute as well, and how it work?For each and every function call, new execution context will be created containing all the information that is nessaryto run exactly that function.When all function are done executing, the engine basically keep waiting for callback function to arrive, and can execute these.What's inside execution context?    
    - all our variables and function declarations are stored, special arguments object    
    - scope chain    
    - this keyword (is generated in a so-called creation phase)
    IN ARROW FUNCTION    The execution contex doesnt have arguments object and this keyword
    
*/

/* ///////////////////////////////////// VARIABLE ENVIRONMENT: HOISTING AND THE TDZVARIABLE ENVIRONMENT    
How variable actual created in javascript
HOISTING    
    Makes some types of variables accessible/usable in the code before they are actually declared.     
    Variables lifted to the top of their scope.    
    The code is basically scanned for variables declarations before it is executed, this happes during the so-called    creattion phase of the execution context.    
    The for each variable that is found in the code, a new property is created in a variable environment object.    
    And that's how hoisting is really work    
    The hoisting works is not the same for all variable types        
    + for function declaration            
        initial value: actual function            
        scope: block (in strict mode)            
        hoisted: yes        
    + for variable defined with var            
        when we are trying to access a variable before it's declared in a code                
        initial value: undefine                
        hoisted: yes                
        scope: function        
    + variable defined with let,and const            
        initial value: uninitialized, temporal dead zone TDZ            
        scope: block        
    + function expression, arrow function            
        depends if using var or let/const    
        Accessing variables before declaration is bad practice and should be avoided.    THIS KEYWORD*/

/* ////////////////////////////// this keywordthis keyword/variable: 
special variable that iscreated for every execution context (every function)takes the value of (points to) the owner of the function in which the this keyword is used;this is not static, it depends on how the function is called, and its value is ony assigned when the function is actually called
*/
// method call
/* this keywork inside that method will point to the object on which method is call.*/

// if simple function call
/*     
if script run in the strict mode -> this will be undefined    
else script run not in strict mode -> this will be a global window object    */

// func1();
// this in arrow function
/* 
this keyword in the arrow function will simply be the this keyword inthe surrounding functionso of the parrent function, is also call lexical this keyword, get the this of outer lexical scope of this function
*/

let age1 = 30;
let oldAge = age1;

age1 = 31;

console.log(age1);
console.log(oldAge);

const me1 = {
  name: "Truong",
  age: 30,
};

const you = me1;

me1.name = "Truong Tran";

console.log(me1);
console.log(you);

you.name = "Truong Tran of you";

console.log(me1);
console.log(you);
