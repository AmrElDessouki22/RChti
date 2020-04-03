const logout = document.getElementById('logout')
const name_ = document.getElementById('name')
const phone = document.getElementById('phone')
const image = document.getElementById('image')
const url = 'https://rchti.herokuapp.com'
const urlpro = 'https://rchti.herokuapp.com'
const setimage = document.getElementById('setimagei')
const setimage2 = document.getElementById('setimagei2')
const setimage3 = document.getElementById('setimagei3')
var imgy;
var formData = new FormData();
var _id = ''

image.addEventListener('change', handleFiles, false);
function handleFiles() {
    console.log('hi');
    
    const image = this.files[0]
    alert('loading')
   formData.append('avatars',image)
  changephoto(urlpro+'/avatar/me')
  setimage.src=urlpro+'/avatar/'+_id
 
   

}
console.log('sadsada');

checkuser(urlpro+'/checkuser')
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
    const data = await response.json()
    if(response.status == 200)
    {
            name_.innerHTML = data.username
            _id = data._id
            if(data.avatar){
                setimage.src=urlpro+'/avatar/'+_id
                imgy = urlpro+'/avatar/'+_id
                
                
                }else
                {
               setimage.src= "https://gutscharity.org.uk/wp-content/uploads/2019/11/blank-profile-picture-973460_960_720.png"
                }
        
    }else{
       return location.href = '/'
       
        
        
        
    }
    
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

