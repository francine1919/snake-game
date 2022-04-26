import React from 'react'

export default function Food(props) {
  const styleFood={
          left: `${props.dot[0]}%`,
          top: `${props.dot[1]}%`,
 
  }
   
    return (
    <div className='food' style={styleFood}></div>
  )
}
