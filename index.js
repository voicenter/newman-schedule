const newman = require('newman'),
    schedule = require('node-schedule');

//runCollection();
module.exports=  class NewmanSchedule {
    constructor(options){
        if(!options){
            throw new Error('missing NewmanSchedule options')
        }else if(options.constructor.name==="Object"){
            options=[options]
        }
        this.options = options;
        this.schedulers ={};
        this.loadSchedule();
    }
    setScheduler(schedulerData){
        let self= this;
        if(!this.validateSchedule(schedulerData))return;
        this.schedulers[schedulerData.id]={};
        this.schedulers[schedulerData.id].id=schedulerData.id;
        this.schedulers[schedulerData.id].newmanOptions= this.margeNewmanOptions(schedulerData.newman);
        this.schedulers[schedulerData.id].schedule = schedule.scheduleJob(schedulerData.schedule, function(){
            console.log('Time for running our lazy newman!');
            self.runCollection(self.schedulers[schedulerData.id].newmanOptions);
        });
    }
    finished(data,report) {
        console.log(data,report);
    }
    runCollection(newmanOptions) {
        let self= this;
        newman.run(newmanOptions,self.finished );
    }
    margeNewmanOptions(newmanOptions) {
        let defaultOptions = {
            collection: null,
            reporters: ['cli'],
            reporter: {}
        };
        newmanOptions=Object.assign(defaultOptions,newmanOptions);
        return newmanOptions;
    }
    loadSchedule() {
        let self = this;
        this.options.forEach((schedulerData, index) =>  {
            if(!schedulerData.id)schedulerData.id=index;
            self.setScheduler(schedulerData);
        })


    }
    validateSchedule(schedulerData) {
        if (!schedulerData && schedulerData.constructor.name==="Object"){
            console.error("The schedulerData Object for this scheduler is not define");
            return false;
        }
        if (!schedulerData.id || schedulerData.id.length<1){
            console.error("The schedulerData Object doesnt contain id parameter");
            return false;
        }
        if (!schedulerData.newman || !schedulerData.newman.constructor.name==="Object"){
            console.error("The schedulerData Object doesnt contain newman options parameter");
            return false;
        }
        if (!schedulerData.newman.collection){
            console.error("The newman options parameter  doesnt contain newman collection parameter");
            return false;
        }
        if (!schedulerData.schedule){
            console.error("The schedulerData Object doesnt contain node-schedule options parameter");
            return false;
        }
        return  true;
    }
};
