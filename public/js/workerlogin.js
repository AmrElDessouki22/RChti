const login = document.getElementById('login')
const id = document.getElementById('ID')
const password = document.getElementById('password')
const loginvald = document.getElementById('loginvald')
const url = 'http://localhost:3000'
const urlpro = 'https://rchti.herokuapp.com'

checkuser(url+'/checkuserworker',document.cookie.split('=')[1])
login.addEventListener('click',myFunction)
function myFunction()
{
    const body = {id:id.value,password:password.value}
    console.log(body);
    
    checklogin(url+'/loginworker',body)
    
}


async function checklogin(url,body)
{   
    const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body)
       
        
    })
    if(response.status == 200)
        {
           return location.href = '/welcomeworker'  
        }  

    const error = await response.text()
    return loginvald.innerHTML = error    

    
    
}
async function checkuser(url,header){
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json','Authorization':'Bearer '+header}
    })
    
    if(response.status == 200)
    {
        return location.href = '/welcomeworker'
    }
   
}