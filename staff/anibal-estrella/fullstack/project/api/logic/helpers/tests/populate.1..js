const context = require('../../context');
console.log('Context:', context);

module.exports = (_users, _events, _places, _eventreviews) => {
    const { users, events, places, eventreviews } = context;
    console.log('Users:', users);
    console.log('Events:', events);
    console.log('Places:', places);
    console.log('Event Reviews:', eventreviews);

    debugger;

    const promises = [];
    if (_users.length) {
        console.log('Processing users:', _users);
        promises.push(users.insertMany(_users)
            .then(insertedUsers => {
                insertedUsers.forEach(user => {
                    console.log('Inserted user nickName:', user.nickName);
                });
            })
            .catch(error => console.error('Error inserting users:', error)));
    }



    // if (_events.length) {
    //     promises.push(events.insertMany(_events).catch(error => console.error('Error inserting events:', error)));
    // }

    // if (_eventreviews.length) {
    //     promises.push(eventreviews.insertMany(_eventreviews).catch(error => console.error('Error inserting event reviews:', error)));
    // }

    // if (_places.length) {
    //     promises.push(places.insertMany(_places).catch(error => console.error('Error inserting places:', error)));
    // }

    return Promise.all(promises).then(results => {
        console.log('Promises resolved:', results);
        return results;
    }).catch(error => {
        console.error('Error in Promise.all:', error);
        throw error;
    });
};

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
