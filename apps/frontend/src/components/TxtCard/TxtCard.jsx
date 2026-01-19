

export function TxtCard({txt, bgColor, style, ...props}){
     let styles = {
          width: "100%",
          padding: "var(--input-padding)",
          borderRadius: "var(--input-radius)",
          ...style,
          
          
     }

     return (
          <div style={styles} {...props}>
               {txt}
          </div>
     )
     
}