const { Client } = require('pg');
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "umuzi",
  password: "pass",
  port: 5432,
 
});

function addNewVisitor(fullname,age,dateOfVisit,timeOfVisit,personWhoAssisted,comments){
  client.connect()
  .then(()=> client.query("INSERT INTO visitors( visitor_name, visitor_age, date_of_visit, time_of_visit, name_of_person_that_assisted, comments) VALUES($1,$2,$3,$4,$5,$6);",[fullname, age, dateOfVisit, timeOfVisit, personWhoAssisted, comments]))
  .then(()=> client.query('select * from visitors;'))
  .then(results => console.log(results.rows))
  .catch(err=> console.log(err));
}


function viewAllVisitors(){
  client.connect()
  .then(()=> client.query('Select visitor_id,visitor_name from visitors;'))
  .then(results => console.log(results.rows))
  .catch(error => console.log(error))
}

function updateVisitor(name, updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments ){
  client.connect()
  .then(()=> client.query('UPDATE visitors set visitor_name = $1 , visitor_age = $2, date_of_visit =$3, time_of_visit =$4, name_of_person_that_assisted =$5 ,comments = $6 where visitor_name = $7', [updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments, name]))
  . then(()=> client.query('Select * from visitors;'))
  .then(results => console.log(results.rows))
  .catch(error => console.log(error));
}

function deleteAVisitor(name){
  client.connect()
  .then(() => client.query('DELETE from visitors WHERE visitor_name = $1', [name]))
  .then(results => console.log(`Visitor :${name} has been deleted.`))
  .catch(error => console.log(`${error}. Error occured trying to delete the following visitor: ${name}.`))
}

function viewAVisitor(id){
  client.connect()
  .then(()=> client.query('Select * from visitors where visitor_id=$1;', [id]))
  .then(results => console.log(results.rows))
  .catch(error => console.log(error))
}

function deleteAllVisitors(){
  client.connect()
  .then(() => client.query('DELETE from visitors'))
  .then(results => console.log('All visitors have been deleted.'))
  .catch(error => console.log(error));
}