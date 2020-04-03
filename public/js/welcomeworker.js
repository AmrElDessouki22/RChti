const logout = document.getElementById('logout')
const name_ = document.getElementById('name')
const image = document.getElementById('image')
const url = 'http://rchti.herokuapp.com/'
const urlpro = 'http://rchti.herokuapp.com'
const setimage = document.getElementById('setimagei')
var formData = new FormData();
var _id = ''

image.addEventListener("change", handleFiles, false);
function handleFiles() {
    const image = this.files[0]
    alert( 'loading')
   formData.append('avatars',image)
  changephoto(urlpro+'/avatarworker/me')
  setimage.src=urlpro+'/avatarworker/'+_id
}
checkuser(urlpro+'/checkuserworker')
logout.addEventListener('click',myFunction)
function myFunction(){
    logout_(urlpro+'/logoutworker').then((data)=>
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
    if(response.status == 200)
    {
        const jsonres = await response.json() 
        name_.innerHTML = jsonres.username
        _id = jsonres._id
        if(jsonres.avatar){
            //http://localhost:3000
            //https://rchti.herokuapp.com
            url='https://rchti.herokuapp.com'
            setimage.src=url+'/avatarworker/'+_id
            console.log(url+'/avatarworker/'+_id);
            
            
            }else
            {
           setimage.src= "https://gutscharity.org.uk/wp-content/uploads/2019/11/blank-profile-picture-973460_960_720.png"
            }
            return;
    }
    return location.href='/'
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
        return alert('done successfully')
    }
    const text = await response.text()
    return alert(text)
}
async function getphoto(url){
    const response = await fetch(url,{
        method:'GET', 
        
    })
    return response
}