import React from 'react'
import './components.css'
function Skeleton({type}) {
    const classes = `skeleton ${type}`;
  return (
    <div className={classes}>
      
    </div>
  )
}

export default Skeleton
