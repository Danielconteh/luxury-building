import React from 'react'
import Image from 'next/dist/client/image'

const Loader = () => {
    return (
      <div>
        <div className='spinner'>    
          <svg>
              <use href='/icons.svg#icon-loader'></use>
          </svg>
        </div>
      </div>
    );
}

export default Loader
