import React from 'react'
import './components.css'
import Skeleton from './Skeleton'
import Shimmer from './Shimmer';
function DetailsSkeleton({theme}) {
    return (
      <>
        <div className={`details-div ${theme}`}>
          <div className="skeleton-list">
            <Skeleton type="img2" />
          </div>
          <Shimmer />
        </div>
        <div className={`details-div2 ${theme}`}>
          <div className="skeleton-list">
            <Skeleton type="title2" />
            <div id="span_c">
              <span id="dtspans">
                {" "}
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" /> <Skeleton type="text" />
              </span>
              <span id="dtspans">
                {" "}
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
              </span>
            </div>

            <Skeleton type="text" />
          </div>
          <Shimmer />
        </div>
      </>
    );
}

export default DetailsSkeleton
