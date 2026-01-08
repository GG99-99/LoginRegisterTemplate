
export function Container({children, w, h, ...props}){
     const styles = {
          height: h,
          width: w
     }
     return(
          <div style={styles} {...props}>
               {children}
          </div>
     )
}