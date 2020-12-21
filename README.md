# newman-schedule
Newman runner Class with node-schedule  triggering 


newman-schedule is a class that get all of if config from his constructor ,
the config need to be array or object of newman-schedule config ,
 newman-schedule config get 2 parameter :
 

 1. newman - which will  the [newman run options](https://www.npmjs.com/package/newman#newmanrunoptions-object--callback-function---run-eventemitter) 
 2. schedule - scheduler info base of node-schedule time  options :
		-[cron style](https://www.npmjs.com/package/node-schedule#cron-style-scheduling)
		- [object-literal-syntax](https://www.npmjs.com/package/node-schedule#object-literal-syntax)


To run a recurcing postman collecaion  open new project :

    npm install --save newman-schedule

and add js file that run the lib like this one :

    const newmanSchedule = require("newman-schedule")  
      
    let config=[  
        {  
            id :"BasicSample",  
            newman:{  
                collection: './postman_collection.json',  
                reporters: ['cli']  
            },  
            schedule:{second: 14}  
        }  
    ]  
      
    let ns = new newmanSchedule(config);


