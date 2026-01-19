
import './Input.css'
export const Input = ({txt, valid, ...props}) => {
     return(

          <div className="inputCont">
               <input   className={valid? 'good' :' bad'}  {...props} />
               <p>{txt}</p>
          </div>
     )
}