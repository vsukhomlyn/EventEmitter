function EventEmitterModule() {
    const store=[];

    return {
        addEvent(name,date){
            store.push([name,date])
        },
        removeEvent(name){
            store.forEach((event,i)=>{
                if (event[0] === name) store.splice(i,1);
            })
        },
        currentStore(){
            return store;
        },
        subscribe(eventName,callback,days=0){
            store.forEach((event,i)=>{
                if (event[0] === eventName) {
                    let timeOutId = setTimeout(callback, timeToEvent(event[i],days));
                    event.push(timeOutId);
                } else {
                    alert('Add the event first to subscribe!');
                }
            });
        },
        unSubscribe(eventName){
            store.forEach((event)=>{
                if (event[0] === eventName) {
                    clearTimeout(event[2]);
                    event.splice(2,1);
                    alert('Unsubscribe!');
                } else {
                    alert("You haven't subscribed for this event!");
                }
            });
        }
    };

    function timeToEvent(eventTime,days) {
        let term = Date.parse(eventTime.slice(3,6) + eventTime.slice(0,3)+
                eventTime.slice(6)) - Date.now() - days*86400000;
        if (term > 0) {
            return term;
        } else {
            alert('You can subscribe only for future events!');
        }
    }
}