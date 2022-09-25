import smile from '../smile-svgrepo-com.svg'
import auth from '../globalstate.js/global.jsx'
import { proxy } from "valtio"
import { useNavigate } from 'react-router-dom'
import heart from '../red-heart-icon.svg'
import up from '../image-up.svg'
import axios from 'axios'
import { useEffect,useState } from 'react'



export function Home(){
  
  const snapshot=proxy(auth)
  const [userName,setUserName]=useState("")
  const [post,setPosts]=useState([])
  const[clicks,setClicks]=useState(()=>[])
  
  useEffect(()=>{
    const timer=setTimeout(()=>{getPosts()},1000)
    return () => clearTimeout(timer);
    
  })
  const like=async (e)=>{
    const id=e.target.parentElement.id
    const t=e.currentTarget
    
    t.style.color="red"
    setTimeout((t)=>{t.style.color="black"},500)
    const data={
      id:id,
      email:snapshot.email
    }
    
    var result=await axios.post("http://localhost:5000/home/like",data)
    console.log(result)
    
  }
  const sendLike=async (id)=>{
      const data={
        id:id,
        email:snapshot.email
      }
      
      var result=await axios.post("http://localhost:5000/home/like",data)
      console.log(result)
  }
 


  const handleClick=(e)=>{
    if(e.path[0].className==="post")
      {
        
        let arr=clicks
        
        if(arr[parseInt(e.path[2].id)]===1){
          
          sendLike(parseInt(e.path[2].id))
          arr[parseInt(e.path[2].id)]=0
          e.path[1].children[1].style.opacity="1"
          e.path[1].children[1].style.width="100px"
          
          setTimeout(()=>{e.path[1].children[1].style.opacity="0";e.path[1].children[1].style.width="50px"},500)
          

        }
        else
        arr[parseInt(e.path[2].id)]=1
          
     }
    
  }


  const renderImages=(arr)=>{
     const allimageContainer=document.getElementsByClassName('middle')
     
     for(let k=0;k<arr.data.length;k++){
      
      if(arr.data[k].photo===null){
        
        continue;
      }
      if(allimageContainer[k].children.length<2){
      let img = document.createElement("img");
      img.src=arr.data[k].photo
      img.classList.add("post")
      allimageContainer[k].prepend(img)
      console.log(allimageContainer[k].children.length)
      }
      
     }
    
     
     return;
  }
  useEffect(()=>{
    
    document.addEventListener("click",handleClick)
    return()=>{
      document.removeEventListener("click",handleClick)
    }
  })
  const getPosts=async ()=>
  {
    try
    {
      const posts=await axios.get(`http://localhost:5000/home`)
      const userInfo=await axios.get(`http://localhost:5000/home:${snapshot.email}`)
      setPosts(posts.data)
      
      setUserName(userInfo.data[0].name)
      renderImages(posts)
    }
  catch(e){
    console.log(e)
  }
  let newArr=clicks

    for(let i=0;i<clicks.length;i++){
      
      newArr[i]=0
    }
    setClicks(newArr)
  }
 
  const navigate=useNavigate()
  
  if(snapshot.authen===false){
    setTimeout(()=>{navigate("/")} , 3500)
    return <h1 style={{color: "red" , width:'fit-content' , margin: "auto", marginTop:'20%',fontSize:"50px"}}> You are not logged In redirecting....</h1> 
  }
  
  const sendPost=async (date,e)=>{

    const data={value:e.target.result, email:snapshot.email, text:document.getElementById('share').value, date:date}
    const result=await axios.post("http://localhost:5000/upload",data)
    console.log(result.data)
    
  }

  const logFile=(e)=>{
    const time = new Date();
    let date=`${time.getDate()}-${time.getMonth()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`

     sendPost(date,e)
  }

  const handleFile=()=>{
    const reader = new FileReader();
    let file=document.getElementById("input-file").files[0];
    reader.onload = logFile;
    reader.readAsDataURL(file)
  }
 
 
  
   
    return(
        
        <div className='home' style={{background: "white" }}>
        <div className="navigation">

    <div className="profile">
       <img className="profile-pic" src="https://cdn2.bigcommerce.com/server5400/3po1k2/products/8171/images/14559/161_light_blue__46032.1418747956.1280.1280.jpg" width="25px" height="25px" alt=""/>
       <p>{userName}</p>
    </div>
  </div>


<div className="share">
   <div className='share-container'>
      
         <img className="profile-pic"  src="https://cdn2.bigcommerce.com/server5400/3po1k2/products/8171/images/14559/161_light_blue__46032.1418747956.1280.1280.jpg" width="25px" height="25px" alt=""/>
         <input type='text' placeholder={`what's new ${userName}`} id="share"></input>
         <img src={up} style={{cursor:"pointer" , width:'28px'}} alt='upload' className='up-img' onClick={()=>{document.getElementById('input-file').click()}}></img>
         <input type='file' id='input-file' alt='upload-image'></input>
         <button className="button-43" onClick={handleFile}>Share</button>
      
   </div>
   
   
</div>

<div className="tumbler">

 {
 post.map((obj,count)=>{
  return(
    <div className="container" key={count} id={obj.id}>

    <div className="top">

      <div className="image">
        <img className="img" src="https://cdn2.bigcommerce.com/server5400/3po1k2/products/8171/images/14559/161_light_blue__46032.1418747956.1280.1280.jpg" width="40px" height="40px" alt=""/>
      </div>

      <div className="information">
        <div className="username">
          <div className="designation"> {obj.name} </div>
          
        </div>
        <div className="name">{obj.date}</div>
      </div>

      <div className="menu">
        <button>&bull;&bull;&bull;</button>
      </div>

    </div>

    <div className="middle"  >

      
      <img className="heart" src={heart} alt="like"></img>
    </div>

    

    <div className="likes"  onClick={like}>{obj.likes} likes</div>

    <div className="caption">
      <div className="content">
        <div className="information">
          
          
          <div className="text"> {obj.content} </div> <button>. . .more</button>
        </div> 
      </div>
    </div>

    <div className="direction">View all comments</div>

    

    <div className="time"> 10 HOURS AGO </div>

    <div className="bottom">

      <div className="bin">
        <img src={smile} width="30px" alt='smile'/>
        <textarea cols="30" rows="1" id="comment" placeholder="Add a comment..."></textarea>
        <button id="post" disabled>Post</button>
      </div>

    </div>
  </div>
  )
 })
 }


</div>
        </div>
    )
}
