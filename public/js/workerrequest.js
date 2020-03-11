const logout = document.getElementById('logout')
const name = document.getElementById('swe')
const setimage = document.getElementById('setimagei')
const template = document.getElementById('template')
const requesttemplate = document.getElementById('request-template').innerHTML
const url = 'https://rchti.herokuapp.com'
const urlpro = 'https://rchti.herokuapp.com'
const h1Color = 'style="color: white;"'

checkuser(urlpro+'/checkuserworker').then((data)=>
    {
        if(data.status == 200)
        {
            data.json().then((data)=>
            {
                
                name.innerHTML = data.username
                var id = data._id
                if(data.avatar){
                    setimage.src=urlpro+'/avatarworker/'+id
                    }else
                    {
                   setimage.src= "https://gutscharity.org.uk/wp-content/uploads/2019/11/blank-profile-picture-973460_960_720.png"
                    }
            })
        }else{
            location.href='/'
            
            
        }

    })
    getrequests(urlpro+'/requestes')

    async function getrequests(url)
    {
        const response = await fetch(url,{
            method:'GET',
            headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        
        })
        if(response.status == 200)
        {
            json = await response.json()
             return setrequest(json)
        }

        return console.log(await response.text());
        
    }
    async function checkuser(url){
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        })
        return response;
    }
    function setrequest(){
       
        for (var I = 0; I < json.length; I++)
        { 
            var create = json[I].createdAt 
            console.log(create);
            
             nameList = '<li style="list-style-type: none; ">' + '<a href='+'https://www.google.com/maps?q='+json[I].location.split(',')[0]+','+json[I].location.split(',')[1]+'>'+' see location on map </a>'+'</li>';
             nameList += '<li style="list-style-type: none;">'+'<h1>' +' Average : ' +json[I].average + '</h1>'+'</h1>' +'</li>';
             nameList += '<li style="list-style-type: none;">'+'<h1>'+' phone : ' + json[I].phone+ '</h1>' + '</li>';
             nameList += '<li style="list-style-type: none;">'+'<h1>'+' Done : ' + json[I].done + '</h1>'+ '</li>';
             nameList += '<li style="list-style-type: none;">'+'<a onclick="yourFunc('+ [I] +');"'+'>'+' Accept '+ '</a>'+ '</li>';
             nameList += '<li style="list-style-type: none;">'+'<h1>'+'ـــــــــــــ'+ '</h1>'+ '</li>';
             
             template.innerHTML +='<div class="hire">'+ '<div class="hire">'+nameList+'</div>'+'</div>';
             console.log(json[I] );
             
             
        }
         
        

    }
    function yourFunc (index) {
        // here you can work with you array of the arguments 'args'
       accept(index)
        
    }
   async function accept(index)
   {
    try{
        const response = await fetch(urlpro+'/accept/request/'+json[index]._id,{
            method :'post',
            headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        })
        if(response.status == 200)
        {
            return location.href = '/welcomeworker'
        }
    
    }catch(e)
    {
        console.log(e.message);
        
    }
   }