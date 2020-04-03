const template = document.getElementById('template')


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
             return await setrequestt(json)
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
   async function setrequestt(){
        for (var I = 0; I < json.length; I++)
        { 
            const jsonesta = await getuserinfo(json[I].owner);
            const userimage = 'src='+urlpro+'/avatar/'+json[I].owner
            var d = new Date(json[I].createdAt);
            const u = '<section><section><img class="image" '+userimage+' alt="user profile pic"></section>'+
            '<section ><h1>'+ jsonesta.name +'</h1><div ><label>Date : </label><label>'+d.toLocaleString()+'</label>'+
            '<a onclick="yourFunc('+ [I] +');"'+'><input  type="button" name="" value="Accept"></a></div><div class="more-info">'+
             '<h6>User wait for Worker</h6><a href="#">More Info</a><a href='+'https://www.google.com/maps?q='+json[I].location.split(',')[0]+','+json[I].location.split(',')[1]+'>Location</a></div></section></section>'
             template.innerHTML += u;
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
   async function getuserinfo(owner)
   {
       try{
       console.log(owner);
       
       const body = JSON.stringify({owner})
       const response = await fetch(urlpro+'/getinfouser',
       {
           method:'POST',
           headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
           body:body
       })
       if(response.status == 200)
       {   
           
           return await response.json()
       }
       
       return console.log(await response.text());
    }catch(e)
    {
        console.log(e.message);
        
    }
       
       
   }