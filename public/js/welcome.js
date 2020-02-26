const logout = document.getElementById('logout')
const name = document.getElementById('swe')
const name_ = document.getElementById('name')
const phone = document.getElementById('phone')
const email = document.getElementById('email')
const image = document.getElementById('image')
const image_error = document.getElementById('error')
const url = 'http://localhost:3000'
const urlpro = 'https://rchti.herokuapp.com'
const setimage = document.getElementById('setimagei')
var formData = new FormData();
var _id = ''

image.addEventListener("change", handleFiles, false);
function handleFiles() {
    const image = this.files[0]
   formData.append('avatars',image)
  changephoto(urlpro+'/avatar/me')
  setimage.src=urlpro+'/avatar/'+_id

}

checkuser(urlpro+'/checkuser').then((data)=>
    {
        if(data.status == 200)
        {
            data.json().then((data)=>
            {
                name.innerHTML = data.username
                name_.value = data.name
                email.value = data.email
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

async function changephoto(url){
    console.log(formData.get('avatars'))
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {'Authorization':'Bearer '+document.cookie.split('=')[1]}
     ,body:formData
    })
    if(response.status == 200)
    {
     return;   
    }
    const text = await response.text()
    return image_error.innerHTML = text
}
async function getphoto(url){
    const response = await fetch(url,{
        method:'GET', 
        
    })
    return response
}