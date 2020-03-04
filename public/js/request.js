const logout = document.getElementById('logout')
const name = document.getElementById('swe')
const avarge_request = document.getElementById('avarge_request')
const name_request = document.getElementById('name_request')
const phone_request = document.getElementById('phone_request')
const sendrequest = document.getElementById('sendrequest')
const erorrsubmint = document.getElementById('erorrsubmint')
const image_error = document.getElementById('error')
const url = 'https://rchti.herokuapp.com'
const urlpro = 'https://rchti.herokuapp.com'
const setimage = document.getElementById('setimagei')
var formData = new FormData();
var _id = ''
var date = new Date()



checkuser(urlpro+'/checkuser').then((data)=>
    {
        if(data.status == 200)
        {
            data.json().then((data)=>
            {
                name_request.value=data.name
                name.innerHTML = data.username
                _id = data._id
                if(data.avatar){
                    setimage.src=urlpro+'/avatar/'+_id
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
    if(!navigator.geolocation)
    {
        return alert('geolocatioon is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((postion)=>
    {
        const location = postion.coords.longitude+','+postion.coords.latitude
        const body = {location:location,phone:phone_request.value,average:avarge_request.value}
        sendrequestfetch(urlpro+'/addrequest',body)
        

    })
    

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

async function sendrequestfetch(url,body)
{
    const response = await fetch(url,{
        method:'POST',
        headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body)
    })
    
    if(response.status== 200)
    {
        return location.href = 'welcome'
      
    }
    const error = await response.text()
    
    
    return erorrsubmint.innerHTML= error
}
async function getphoto(url){
    const response = await fetch(url,{
        method:'GET', 
        
    })
    return response
}