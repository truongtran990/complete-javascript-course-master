"use strict";

///////////////////////// MODULE /////////////////////////
/* 
Module
    Reusable piece of code that encapsulates implementation details 
    Usually a standalone file, but it doesn't have to be. For simpling, we can think of a separate file.   

    A module contains some codes, and we can import and export value of a module.
    Whatever we export from a module, it called the public API.

    We can export and import the value from other module.

Why module?
    Compose software: Modules are small building blocks that we put together to build complex applications
    Isolate components: Modules can be developed in isolation without thinking about the entire codebase
    Abstract code: Implement low-level code in modules and import these abstractions into other modules
    Organized code: Modules naturally lead to a more organized codebase;

ES6 - Native JS modules
    We didn't have the modules before ES6, but we can use external libraries.
    Modules stored in files, exactly one module per file.
   
Script is also a file.
Compare the ES6 module vs script (both of them are also the file)

                        ES6 module                                  Script

Top-level variable      | Scoped to module                          | Global
Default mode            | Strict mode                               | Sloppy mode
Top-level this          | undefined                                 | window
Imports and exports     | Yes                                       | No    
HTML linking            | <script type="module" scr="path_to_js">   | <script  scr="path_to_js">
File downloading        | Asynchronous way                          | Synchronous is default, unless using the defer, async keyword


Importing value always the first things happen in the modules.



*/
