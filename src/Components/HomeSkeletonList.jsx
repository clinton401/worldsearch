import React from 'react'
import Skeleton from './Skeleton';
import "./components.css";
import Shimmer from './Shimmer';
function HomeSkeletonList({theme}) {
  return (
    <div className= {`skeleton-wrapper ${theme}`}>
      <div className="skeleton-list">
        <Skeleton type="img" />
        <div className="skeleton-list-container">
          
          <Skeleton type="title" />
          <Skeleton type="text" />
          <Skeleton type="text" />
          <Skeleton type="text" />
          <Skeleton type="btn" />
        </div>
      </div>
      <Shimmer/>
    </div>
  );
}

export default HomeSkeletonList
