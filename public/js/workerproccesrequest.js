
const colorlib = document.getElementById('colorlib-main')


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
            const userimage = 'src='+urlpro+'/avatar/'+json[I].owner
            const jsonesta= await getuserinfot(json[I].owner)
            var d = new Date(json[I].createdAt);
            const u = '<section><section><img class="image" '+userimage+' alt="user profile pic"></section>'+
            '<section ><h1>'+ jsonesta.name +'</h1><div ><label>Date : </label><label>'+d.toLocaleString()+'</label>'+
            '<a href='+'onclick="yourFunc('+ [I] +');'+'><input  type="button" name="" value="Done"></a></div><div class="more-info">'+
             '<h6>User wait for Worker</h6><a href="#">More Info</a><a href='+'https://www.google.com/maps?q='+json[I].location.split(',')[0]+','+json[I].location.split(',')[1]+'>Location</a></div></section></section>'
            
        
                colorlib.innerHTML +=u;
             
        }


    }
    async function getuserinfot(owner)
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
    