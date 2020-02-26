
const signup = document.getElementById("signup")
const email = document.getElementById("email")
const password = document.getElementById("password")
const repassword = document.getElementById("repassword")
const username = document.getElementById("username")
const name = document.getElementById("name")
const error = document.getElementById("error")
const url = 'http://localhost:3000'
const urlpro = 'https://rchti.herokuapp.com'
console.log(document.cookie.split('=')[1]);

checkuser(urlpro+'/checkuser',document.cookie.split('=')[1])
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
    postData(urlpro+'/adduser', data)
}
    
}


async function postData(url , data ) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.status== 200)
    {
       return location.href = '/welcome'
    }
    const text = await response.text()
    return error.innerHTML = text.split('User validation failed:')[1]

  }
  async function checkuser(url,header){
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json','Authorization':'Bearer '+header}
      })
      return response;
  }
  
  