const context = require('../logic/context')
console.log(context);


const mongodb = require('mongodb')
const { MongoClient } = mongodb
const client = new MongoClient('mongodb://127.0.0.1:27017/data-project')

client.connect()
    .then(connection => {
        const users = connection.db().collection('users')

        return users.insertOne({ name: 'John', nickName: '@Johnn', password: 'password', email: 'john24@example.com', registrationDate: new Date() })

    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })
