//require mongoose which we installed earlier using npm install mongoose
const mongoose = require('mongoose');

//we establish connection between mongoose and our database and await for that connection to happen
async function main() {
  await mongoose.connect('mongodb://localhost:27017/todo_list_db');
}

//when connection established, we print success message 
main().then(value => {console.log('successfully connected to database !')})
.catch(err => {console.log(err)});