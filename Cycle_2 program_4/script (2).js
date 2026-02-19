async function fetchData () {
try {
// show loading indicator
document . getElementById ('loading').style.display = 'block';
// fetch dat a from api
const response = await

fetch ('https://jsonplaceholder.typicode.com/users')

.then ( response=> {
if (!response.ok ) {
return Promise.reject ('Something went wrong') ;
}
return response.json () ;


})
.then (users=>{
renderData (users) ;
})
.catch ( error =>{
console.error ('There was a problem fetching the data' , error ) ;

alert (" failed to fetch data ") ;
})
;
}
catch ( error ) {
console.error ( ' Error fetching data : ' , error ) ;
}
finally {
document.getElementById ('loading').style.display = 'none';
}
}
function renderData ( data ) {
const dataBody = document . getElementById ( 'dataBody') ;
dataBody . innerHTML = ' ';
data . forEach ( user => {
const row = document . createElement ( 'tr') ;
row . innerHTML = `
<td >${ user . id } </td >
<td >${ user . name } </td >
<td >${ user . email } </td >
`;
dataBody.appendChild ( row ) ;
}) ;
}
fetchData ();
