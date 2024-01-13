import React from 'react';
import "./components.css";
import Skeleton from "./Skeleton";
import Shimmer from './Shimmer';

function InputSkeleton({theme}) {
    return (
      <>
        <div className={`skeleton-list-search ${theme}`}>
          <div className="skeleton-list">
            <Skeleton type="input_1" />
          </div>
          <Shimmer/>
        </div>

        <div className={`skeleton-list-filter ${theme}`}>
          <div className="skeleton-list">
            <Skeleton type="input_2" />
          </div>
          <Shimmer/>
        </div>
      </>
    );
}

export default InputSkeleton
