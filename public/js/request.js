

const avarge_request = document.getElementById('avarge_request')
const name_request = document.getElementById('name_request')
const phone_request = document.getElementById('phone_request')
const sendrequest = document.getElementById('sendrequest')
const erorrsubmint = document.getElementById('erorrsubmint')
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
        return alert('geolocatioon is not supported by your browser can not send request from this browser')
    }
    navigator.geolocation.getCurrentPosition((postion)=>
    {
        const location = postion.coords.latitude+','+postion.coords.longitude
        const body = {location:location,phone:phone_request.value,average:avarge_request.value}
        sendrequestfetch(urlpro+'/addrequest',body)
        

    })
    

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
        console.log('33');
        
        return location.href = 'welcome'
      
    }
    const error = await response.text()
    
    
    return alert(error)
}
async function getphoto(url){
    const response = await fetch(url,{
        method:'GET', 
        
    })
    return response
}