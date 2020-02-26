const login = document.getElementById('login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const loginvald = document.getElementById('loginvald')
const url = 'http://localhost:3000'
const urlpro = 'https://rchti.herokuapp.com'

login.addEventListener('click',myFunction)
function myFunction()
{
    const body = {email:email.value,password:password.value}
    checklogin(urlpro+'/login',body)
    
}


async function checklogin(url,body)
{
    console.log(JSON.stringify(body));
    
    const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body)
       
        
    })
    if(response.status == 200)
        {
           return location.href = '/welcome'  
        }  

    const error = await response.text()
    return loginvald.innerHTML = error    

    
    
}
