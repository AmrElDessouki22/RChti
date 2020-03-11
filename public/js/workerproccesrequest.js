const logout = document.getElementById('logout')
const name = document.getElementById('swe')
const setimage = document.getElementById('setimagei')
const colorlib = document.getElementById('colorlib-main')
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
                _id = data._id
                if(data.avatar){
                
                    
                    setimage.src=urlpro+'/avatarworker/'+_id
                    }else
                    {
                   setimage.src= "https://gutscharity.org.uk/wp-content/uploads/2019/11/blank-profile-picture-973460_960_720.png"
                    }
            })
        }else{
           console.log('failed');
           
            
            
        }

    })
    getrequests(urlpro+'/myrequestaccept')

    async function getrequests(url)
    {
        const response = await fetch(url,{
            method:'GET',
            headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        
        })
        if(response.status == 200)
        {
            return setrequest(await response.json())
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
     async function setrequest(json){
        
        
        for (var I = 0; I < json.length; I++)
        { 
            
                nameList = '<li style="list-style-type: none; ">' + '<a href='+'https://www.google.com/maps?q='+json[I].location.split(',')[0]+','+json[I].location.split(',')[1]+'>'+' see location on map </a>'+'</li>';
                 nameList += '<li style="list-style-type: none;">'+'<h1>' +' Average : ' +json[I].average + '</h1>'+'</h1>' +'</li>';
                nameList += '<li style="list-style-type: none;">'+'<h1>'+' phone : ' + json[I].phone+ '</h1>' + '</li>';
                nameList += '<li style="list-style-type: none;">'+'<h1>'+' Done : ' + json[I].done + '</h1>'+ '</li>';
                nameList += '<li style="list-style-type: none;">'+'<h1>'+' user name : ' + ( await fun(json[I]._id)).name + '</h1>'+ '</li>';
                nameList += '<li style="list-style-type: none;">'+'<h1>'+' user phone : ' + ( await fun(json[I]._id)).phone + '</h1>'+ '</li>';
                nameList += '<li style="list-style-type: none;">'+'<img src="'+urlpro+'/avatar/'+( await fun(json[I]._id)).id +'" >'+ '</li>';
                nameList += '<li style="list-style-type: none;">'+'<a href="/doneform?request='+json[I]._id+'&username='+ ( await fun(json[I]._id)).name+'&user='+( await fun(json[I]._id)).id+'">'+' Done Request </a>'+ '</li>';
                nameList += '<li style="list-style-type: none;">'+'<h1>'+'ـــــــــــــ'+ '</h1>'+ '</li>';
                colorlib.innerHTML +='<div class="hire">'+ '<div class="hire">'+nameList+'</div>'+'</div>';
             
        }


    }
    async function fun(id)
    {
        const response = await fetch(urlpro+'/userinfo/'+id,{
            method:'GET',
            headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        })
        if(response.status ==200)
        {
            const json_ = await response.json()
            const info =  {id:json_._id,name : json_.name,avatar :json_.avatar,phone:json_.phone}            
            return  info
        }else
        {
            return console.log(await response.text());
            
        }
    }
    