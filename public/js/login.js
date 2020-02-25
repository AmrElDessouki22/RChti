const login = document.getElementById('login')
const email = document.getElementById('email')
const password = document.getElementById('password')

login.addEventListener('click',myFunction)
function myFunction()
{
    const body = {email:email.value,password:password.value}
    checklogin('https://rchti.herokuapp.com/login',body).then((data)=>
    {
        if(data.status == 200)
        {

            location.href = '/welcome'
            
            

        }


    })
    




}


async function checklogin(url,body)
{
    console.log(JSON.stringify(body));
    
    const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body)
       
        
    })
    return response
}
