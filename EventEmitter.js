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
            store.forEach((event)=>{
                if (event[0] === eventName) {
                    if (event.length>2) {
                        alert("You have subscribed for this event already!");
                        return;
                    }
                    let timeToEventVar = timeToEvent(event[1],days);
                    if (timeToEventVar) {
                        let timeOutId = setTimeout(callback, timeToEventVar);
                        event.push(timeOutId);
                        event.push(Date.now() + timeToEventVar);
                        alert('You are subscribed!');
                    }
                } else {
                    alert('Add the event first to subscribe!');
                }
            });
        },
        unSubscribe(eventName){
            store.forEach((event)=>{
                if (event[0] === eventName) {
                    clearTimeout(event[2]);
                    event.splice(2,2);
                    alert('You are unsubscribed!');
                } else {
                    alert("You haven't subscribed for this event!");
                }
            });
        },
        checkEvents(){
            let missed=[];
            store.forEach((event)=>{
                if (Date.now() - event[3] < 0) {
                    missed.push(event);
                    clearTimeout(event[2]);
                    event.splice(2,2);
                }
            });
            if (missed) alert("Missed reminders: " + missed);
        }
    };

    function timeToEvent(eventTime,days) {
        let term;
        if (eventTime.trim.length === 14) {
            term = Date.parse(eventTime.slice(3,6) + eventTime.slice(0,3)+
                eventTime.slice(6)) - Date.now() - days*86400000;
        } else if (eventTime.trim.length === 5){
            term = Date.parse(eventTime.slice(3,5) + "." + eventTime.slice(0,3)+
                (new Date().getFullYear()) + " 9:00") - Date.now() - days*86400000;
            if (term < 0) {
                term = Date.parse(eventTime.slice(3,5) + "." + eventTime.slice(0,3)+
                        (new Date().getFullYear()+1) + " 9:00") - Date.now() - days*86400000;
            }
        } else {
            alert("You can't subscribe to event with incorrect time: " + eventTime);
        }
        if (term > 0) {
            return term;
        } else {
            alert('You can subscribe only for future events!');
        }
    }
}