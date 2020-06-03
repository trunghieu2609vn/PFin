
const server = 'localhost:27017';
const dbName = 'PFin_App';
const mongodb = require('mongoose');

let connection = `mongodb://${server}/${dbName}`;

class MongoDBConnection{
  constructor(){
    this._connection();
  }

  _connection(){
    try {
      mongodb.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
      
    } catch (e) {
        console.error(e);
    } 
  }
}

module.exports = new MongoDBConnection();