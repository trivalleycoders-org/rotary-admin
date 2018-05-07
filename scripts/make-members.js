const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const ObjectID = require('mongodb').ObjectId
// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'RotaryDev'

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log('Connected successfully to server')

  const db = client.db(dbName)
  insertDocuments(db, function() {
    client.close()
  })


})

const insertDocuments = function(db, callback) {
  const collectionName = 'members'
  // Get the documents collection
  const collection = db.collection(collectionName)
  // Insert some documents
  collection.insertMany(getMembers(10), function(err, result) {
    assert.equal(err, null)
    assert.equal(10, result.result.n)
    assert.equal(10, result.ops.length)
    console.log(`Inserted ${result.ops.length} documents into the collection ${collectionName}`)
    callback(result)
  })
}

const getMembers = (num) => {
  let members = []
  const comments = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt malesuada diam ultricies blandit. Nam sit amet varius orci. Donec non tellus ornare, tincidunt risus et, viverra ligula. Praesent diam diam, placerat commodo dolor nec, elementum luctus lacus. '
  for (let i=0; i<num; i++) {
    let firstName = `First-${i}`
    let lastName = `Last-${i}`
    let j = i + 1
    let email = `${firstName}@${lastName}.com`
    let phone = [
      {
        _id: new ObjectID(),
        phoneType: 'Mobile',
        phoneNumber: `${i}${i}${i}-${i}${i}${i}-${i}${i}${i}${i}`
      },
      {
        _id: new ObjectID(),
        phoneType: 'Mobile',
        phoneNumber: `${j}${j}${j}-${j}${j}${j}-${j}${j}${j}${j}`
      }
    ]
    let roles = [
      {
        name: 'Photographer',
        avoid: false
      },
      {
        name: 'Journal',
        avoid: false
      },
      {
        name: 'Greeter',
        avoid: true
      }
    ]
    let member = {
      _id: new ObjectID(),
      firstName,
      lastName,
      comments,
      email,
      phone,
      roles,
      exempt: i % 2 === 0 ? true : false,
    }
    members.push(member)

  }
  return members
}

// const connect = () => Mongoose.connect(process.env.MONGODB_URI).then(() => {
//   greenf('Mongoose connection: ', 'connected')
//
// })

// const some = async () => {
//   // await connect()
//   // let members
//   // members = await getMembers(10)
//   // const res = await app.post('/members').send(members)
//   // yellow('res.body.members', res.body.members)
// }
