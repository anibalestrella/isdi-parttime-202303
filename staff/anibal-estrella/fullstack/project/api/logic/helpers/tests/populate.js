const context = require('../../context')
console.log('Context:', context);

module.exports = (_users, _events, _places, _eventreviews) => {
    const { users, events, places, eventreviews } = context

    console.log('Users:', users);
    console.log('Events:', events);
    console.log('Places:', places);
    console.log('Event Reviews:', eventreviews);
    console.log('POPULATE!!!!!');

    const promises = []

    promises.push(users.insertMany(_users))

    if (_events.length)
        promises.push(events.insertMany(_events))

    if (_eventreviews.length)
        promises.push(eventreviews.insertMany(_eventreviews))

    if (_places.length)
        promises.push(places.insertMany(_places))

    return Promise.all(promises)
}
