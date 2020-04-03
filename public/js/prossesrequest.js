


const colorlib = document.getElementById('sectianola')
const h1Color = 'style="color: white;"'
var imageop;
var name_oo;
console.log(urlpro);
checkuser(urlpro+'/checkuser')
async function checkuser(url){
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
    })

    
    const data = await response.json()
    
    if(response.status == 200)
    {
            name_.innerHTML = data.username
            name_oo = data.username
         
            
            _id = data._id
            if(data.avatar){
                setimage.src=urlpro+'/avatar/'+_id
                imageop = urlpro+'/avatar/'+_id
                getrequests(urlpro+'/getprossesrequest',imgy,name_)
            
                
                }else
                {
               setimage.src= "https://gutscharity.org.uk/wp-content/uploads/2019/11/blank-profile-picture-973460_960_720.png"
                }
        
    }else{
       return location.href = '/'
       
        
        
        
    }
    
}


    async function getrequests(url,imgy,name_)
    {
        const response = await fetch(url,{
            method:'GET',
            headers: {'Content-Type': 'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]}
        
        })
        if(response.status == 200)
        { 
            return setrequest(await response.json(),imgy,name_)
        }

        return alert(await response.text())
        
    }
   
     async function setrequest(json,imgy,name_){
         console.log(json);
         var IMAGO = 'src='+imgy;
        
        for (var I = 0; I < json.length; I++)
        { 
            console.log('i');
            
            var d = new Date(json[I].createdAt);
            var u ;
            var worker             
             if(json[I].worker == undefined )
            {
                console.log('i');
                
                worker = 'Searching for worker'
                 u ="<section>"+"<section>"+'<img class="image" '+ IMAGO+'>'+
            '</section><section><h1>'+name_oo+'</h1><div><label>Date : </label><label> '+d.toLocaleString()+'</label>'+
                '<a href='+'https://www.google.com/maps?q='+json[I].location.split(',')[0]+','+json[I].location.split(',')[1]+'>  <input type="button" name="" value="Location"></a></div><div class="more-info"><h6>'+worker+'</h6>'+
                '<a href="#">More Info</a><a href="#">Cancel</a></div></section>'+"</section>"


            }else
            {
                console.log('ii');
                const IMAGO = "src="+imgy+"";
                
                worker = 'wroker work on it'
                 u =  "<section>"+
                "<section>"+
                  '<img class="image" '+ IMAGO+'>'+
                '</section><section><h1>'+name_oo+'</h1><div><label>Date : </label><label> '+d.toLocaleString()+'</label>'+
                    '<a href='+'https://www.google.com/maps?q='+json[I].location.split(',')[0]+','+json[I].location.split(',')[1]+'>  <input type="button" name="" value="Location"></a></div><div class="more-info"><h6>'+worker+'</h6>'+
                    '<a href="#">More Info</a><a href="#">Cancel</a></div></section>'+"</section>"
               

            }
            
    
            
            
             colorlib.innerHTML +=u;
             
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