
import './Input.css'
export let Input = ({txt, inputID, inputPlch}) => {
     return(
          <div className="inputCont">
               <p>{txt}</p>
               <input  id={inputID} placeholder={inputPlch}/>
          </div>
     )
}