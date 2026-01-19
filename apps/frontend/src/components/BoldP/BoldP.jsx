



export function BoldP({children, fz, ...props}){


     let hgt =fz? fz:"22px"

     let styles = {
          fontSize: hgt,
          fontWeight: "600",
          color: "var(--boldp-color)"
     }
     return(
          <p className="boldp" style={styles} {...props}>{children}</p>
     )
}