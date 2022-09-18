import smile from '../smile-svgrepo-com.svg'
import auth from '../globalstate.js/global.jsx'
import { proxy } from "valtio"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'


export function Home(){
  const snapshot=proxy(auth)
  
  const [userName,setUserName]=useState("")
  const [post,setPosts]=useState([])
  const[clicks,setClicks]=useState(()=>[])
  useEffect(()=>{
    setTimeout(()=>{getPosts()},500)
    
  })

  const sendLike=async (id)=>{
      const data={
        id:id,
        email:snapshot.email
      }
      console.log(data)
      var result=await axios.post("http://localhost:5000/home/like",data)
      console.log(result)
  }
 
 useEffect(()=>{
  setTimeout(()=>{
    let newArr=clicks
    for(let i=0;i<clicks.length;i++){
      
      newArr[i]=0
    }
    setClicks(newArr)
  },500)
 })
  const handleClick=(e)=>{
    if(e.path[0].className==="post")
      {
        
        let arr=clicks
        
        if(arr[parseInt(e.path[2].id)]===1){
          console.log('added')
          sendLike(parseInt(e.path[2].id))
          arr[parseInt(e.path[2].id)]=0

        }
        else
        arr[parseInt(e.path[2].id)]=1
          
     }
    
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
      
    
    
    
  }
  catch(e){
    console.log(e)
  }
  }
  const navigate=useNavigate()
  
  if(snapshot.authen===false){
    setTimeout(()=>{navigate("/")} , 3500)
    return <h1 style={{color: "red" , width:'fit-content' , margin: "auto", marginTop:'20%',fontSize:"50px"}}> You are not logged In redirecting....</h1> 
  }


 
 
  

    return(
        <div className='home' style={{background: "white" }}>
        <div className="navigation">

    <div className="profile">
       <img className="img" src="https://cdn2.bigcommerce.com/server5400/3po1k2/products/8171/images/14559/161_light_blue__46032.1418747956.1280.1280.jpg" width="25px" height="25px" alt=""/>
       <p>{userName}</p>
    </div>
    

  </div>


<div className="suggestions">

</div>

<div className="tumbler">

 {
 post.map((obj,count)=>{
  return(
    <div className="container" id={obj.id}>

    <div className="top">

      <div className="image">
        <img className="img" src="https://cdn2.bigcommerce.com/server5400/3po1k2/products/8171/images/14559/161_light_blue__46032.1418747956.1280.1280.jpg" width="40px" height="40px" alt=""/>
      </div>

      <div className="information">
        <div className="username">
          <div className="designation"> {obj.name} </div>
          <div className="blue-tick">  </div>
        </div>
        <div className="name">{obj.date}</div>
      </div>

      <div className="menu">
        <button>&bull;&bull;&bull;</button>
      </div>

    </div>

    <div className="middle" >
      <img src="https://cdn2.bigcommerce.com/server5400/3po1k2/products/8171/images/14559/161_light_blue__46032.1418747956.1280.1280.jpg?c=2g" className="post" alt=""/>
    </div>

    <div className="options">
      <div className="buttons">

     
      

      </div>

    </div>

    <div className="likes">{obj.likes} likes</div>

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
