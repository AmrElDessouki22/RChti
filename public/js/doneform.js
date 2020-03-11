const logout = document.getElementById('logout')
const name = document.getElementById('swe')
const avarge_request = document.getElementById('avarge_request')
const name_request = document.getElementById('name_request')
const user_request = document.getElementById('user_request')
const plastic_request = document.getElementById('plastic_request')
const glass_request = document.getElementById('glass_request')
const cardboard_request = document.getElementById('cardboard_request')
const sendrequest = document.getElementById('sendrequest')
const erorrsubmint = document.getElementById('erorrsubmint')
const image_error = document.getElementById('error')
const url = 'https://rchti.herokuapp.com'
const urlpro = 'http://localhost:3000'
const setimage = document.getElementById('setimagei')
var formData = new FormData();
var _id = ''
var date = new Date()

const {request , username,user} = Qs.parse(location.search,{ignoreQueryPrefix:true})
user_request.value = username


checkuser(urlpro+'/checkuserworker').then((data)=>
    {
        if(data.status == 200)
        {
            data.json().then((data)=>
            {
                name_request.value=data.username
                name.innerHTML = data.username
                _id = data._id
                if(data.avatar){
                    setimage.src=urlpro+'/avatarworker/'+_id
                    }else
                    {
                   setimage.src= "https://gutscharity.org.uk/wp-content/uploads/2019/11/blank-profile-picture-973460_960_720.png"
                    }
            })
        }else{
            location.href='/'
            
            
        }

    })
    
    
logout.addEventListener('click',myFunction)
function myFunction(){
    logout_(urlpro+'/logout').then((data)=>
    {
        console.log(document.cookie);
        
        if(data.status == 200)
        {
            location.href = '/'
        }

    })

}
sendrequest.addEventListener('click',sendrequest_)
 function sendrequest_(){
     total =parseFloat(plastic_request.value) +parseFloat(cardboard_request.value) + parseFloat(glass_request.value)
    const body = {doneaverage:total}
    
    
         sendrequestdone(urlpro+'/donerequestworker/'+request,body)
         
}
async function logout_(url)
{
    const response = await fetch(url,{
        method:'POST',
        headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
    })
    return response
}
async function checkuser(url){
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
    })
    return response;
}

async function sendrequestdone(url,body)
{
    const response = await fetch(url,{
        method:'POST',
        headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body)
    })
    
    if(response.status== 200)
    {
        
        addpoint()
      
    }
    
    
    
    
    return console.log( await response.text());
}
async function addpoint(){
    console.log(request);
    
    const response = await fetch(urlpro+'/addpoints/'+user,{
        method:'POST',
        headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify({id:request,points:total})
    })
    if(response.status == 200)
    {
        return location.href = 'welcomeworker'
    }
    return console.log(await response.text());
    
}
async function getphoto(url){
    const response = await fetch(url,{
        method:'GET', 
        
    })
    return response
}