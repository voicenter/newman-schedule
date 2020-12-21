const newmanSchedule = require("./index");
let config=[
    {
        id :"BasicSample",
        newman:{
            collection: './postman_collection.json',
            reporters: ['cli']
        },
        schedule:{second: 14}
    }
];

let ns = new newmanSchedule(config);
