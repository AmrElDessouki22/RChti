const logout = document.getElementById('logout')
const name = document.getElementById('swe')
const setimage = document.getElementById('setimagei')
const colorlib = document.getElementById('colorlib-main')
const url = 'http://localhost:3000'
const urlpro = 'http://localhost:3000'
const h1Color = 'style="color: white;"'

checkuser(urlpro+'/checkuser').then((data)=>
    {
        if(data.status == 200)
        {
            data.json().then((data)=>
            {
                
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
    getrequests(urlpro+'/doneuser')
    

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
            
            var worker 
            
            
            
             nameList = '<li style="list-style-type: none; ">' + '<a href='+'https://www.google.com/maps?q='+json[I].location.split(',')[0]+','+json[I].location.split(',')[1]+'>'+' see location on map </a>'+'</li>';
             nameList += '<li style="list-style-type: none;">'+'<h1>' +' Average : ' +json[I].average + '</h1>'+'</h1>' +'</li>';
             nameList += '<li style="list-style-type: none;">'+'<h1>'+' phone : ' + json[I].phone+ '</h1>' + '</li>';
             nameList += '<li style="list-style-type: none;">'+'<h1>'+' Done : ' + json[I].done + '</h1>'+ '</li>';
             if(json[I].worker == undefined )
            {
                worker = 'Searching for one'
                nameList += '<li style="list-style-type: none;">'+'<h1>'+' Worker : ' + worker + '</h1>'+ '</li>';


            }else
            {
                worker = json[I].worker
                nameList += '<li style="list-style-type: none;">'+'<h1>'+' Worker name : ' + ( await fun(json[I]._id)).name + '</h1>'+ '</li>';
                nameList += '<li style="list-style-type: none;">'+'<h1>'+' Worker phone : ' + ( await fun(json[I]._id)).phone + '</h1>'+ '</li>';
                nameList += '<li style="list-style-type: none;">'+'<img src="'+urlpro+'/avatarworker/'+( await fun(json[I]._id)).id +'" >'+ '</li>';

            }
            
            
            
             nameList += '<li style="list-style-type: none;">'+'<h1>'+'ـــــــــــــ'+ '</h1>'+ '</li>';
             colorlib.innerHTML +='<div class="hire">'+ '<div class="hire">'+nameList+'</div>'+'</div>';
             
        }


    }
    async function fun(id)
    {
        const response = await fetch(urlpro+'/workerprofile/'+id,{
            method:'GET',
            headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        })
        if(response.status ==200)
        {
            const json_ = await response.json()
            const info =  {id:json_._id,name : json_.username,avatar :json_.avatar,phone:json_.phone}            
            return  info
        }else
        {
            return console.log(await response.text());
            
        }
    }