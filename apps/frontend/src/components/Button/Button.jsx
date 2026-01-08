import "./Button.css"
export let Button = ({txt, onclick,...props}) => {
     return(
          <div className="btn" onClick={onclick} {...props}>{txt}</div>
     )
}