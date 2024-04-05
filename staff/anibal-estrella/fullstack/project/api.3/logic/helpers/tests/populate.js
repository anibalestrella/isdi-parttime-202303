const context = require('../../context')

module.exports = (_users, _events, _places, _eventreviews) => {
    const { users, events, places, eventreviews } = context;
    ;
    debugger
    const promises = [];
    if (_users.length) {
        promises.push(users.insertMany(_users).catch(error => console.error('Error inserting users:', error)));

    }
    console.log('POPULATE!!!!!');
    console.log('Context:', context);
    console.log('Users:', users.nickName, users);
    console.log('Users.nickName:', users.nickName);
    console.log('Events:', events);
    console.log('Places:', places);
    console.log('Event Reviews:', eventreviews)
    // if (_events.length) {
    //     promises.push(events.insertMany(_events).catch(error => console.error('Error inserting events:', error)));
    // }

    // if (_eventreviews.length) {
    //     promises.push(eventreviews.insertMany(_eventreviews).catch(error => console.error('Error inserting event reviews:', error)));
    // }

    // if (_places.length) {
    //     promises.push(places.insertMany(_places).catch(error => console.error('Error inserting places:', error)));
    // }

    return Promise.all(promises);
}


// const context = require('../../context')

// module.exports = (_users, _events, _places, _eventreviews) => {
//     const { users, events, places, eventreviews } = context
//     console.log('populate!!!!!');
//     const promises = []

//     promises.push(users.insertMany(_users))

//     if (_events.length)
//         promises.push(events.insertMany(_events))

//     if (_eventreviews.length)
//         promises.push(eventreviews.insertMany(_eventreviews))

//     if (_places.length)
//         promises.push(places.insertMany(_places))

//     return Promise.all(promises)
// }
