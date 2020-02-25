
const signup = document.getElementById("signup")
const email = document.getElementById("email")
const password = document.getElementById("password")
const repassword = document.getElementById("repassword")
const username = document.getElementById("username")
const name = document.getElementById("name")
const error = document.getElementById("error")
console.log(document.cookie.split('=')[1]);

checkuser('https://rchti.herokuapp.com/checkuser',document.cookie.split('=')[1])
    .then((data) => {
        console.log(data.status);
        
     if(data.status == 200)
     {
         location.href = '/welcome'
        
     }
    });
signup.addEventListener("click", myFunction);

function myFunction(){
    if(password.value == repassword.value){
    const data =  { name:name.value,email:email.value
        ,password:password.value,username:username.value }
    postData('https://rchti.herokuapp.com/adduser', data)
    .then((data) => {
     if(data.status == 200)
     {
         location.href = '/login' 
     }
    });
}else
{
    error.innerHTML = 'password not match with repassword '

}
    
}


async function postData(url , data ) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return  response; // parses JSON response into native JavaScript objects
  }
  async function checkuser(url,header){
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json','Authorization':'Bearer '+header}
      })
      return response;
  }
  
  