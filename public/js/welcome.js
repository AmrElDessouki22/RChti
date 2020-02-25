const logout = document.getElementById('logout')
const name = document.getElementById('swe')
const name_ = document.getElementById('name')
const phone = document.getElementById('phone')
const email = document.getElementById('email')
const image = document.getElementById('image')
const setimage = document.getElementById('setimagei')
var formData = new FormData();
var _id = ''

image.addEventListener("change", handleFiles, false);
function handleFiles() {
    formData.append('avatars',this.files[0])
  changephoto('https://rchti.herokuapp.com/avatar/me').then((data)=>
  {
      
      if(data.status == 200)
      {

      }else
      {
          console.log(data.text());
          
      }

  })
  setimage.src='https://rchti.herokuapp.com/avatar/'+_id

}

checkuser('https://rchti.herokuapp.com/checkuser').then((data)=>
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
                    setimage.src='https://rchti.herokuapp.com/avatar/'+_id
                    }
            })
        }else{
            console.log(data.text());
            
        }

    })
logout.addEventListener('click',myFunction)
function myFunction(){
    logout_('https://rchti.herokuapp.com/logout').then((data)=>
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
   
    
    return response;
}
async function getphoto(url){
    const response = await fetch(url,{
        method:'GET', 
        
    })
    return response
}