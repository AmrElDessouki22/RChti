const login = document.getElementById('login')
const id = document.getElementById('ID')
const password = document.getElementById('password')
const url = 'http://rchti.herokuapp.com/'
const urlpro = 'http://rchti.herokuapp.com/'

checkuser(urlpro+'/checkuserworker',document.cookie.split('=')[1])
login.addEventListener('click',myFunction)
function myFunction()
{
    const body = {id:id.value,password:password.value}
    checklogin(urlpro+'/loginworker',body)
    
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
    return alert(error)  

    
    
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