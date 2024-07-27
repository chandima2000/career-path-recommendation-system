import React from 'react'
export default function Loader() {


  return (
    <div>
      <div className="w-full h-screen z-10 fixed top-0 left-0 bg-gray-900 flex justify-center items-center">
      <div className="w-full flex flex-col items-center">
        {/* copy svg image and past it here */}
        <svg
          height="80"
          viewBox="0 0 196 313"
          fill=""
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Loader</title>
          <defs>
            <linearGradient id="ttb" y2="1">

                {/* if you are thinking how it is animating 
                    we have added animation to svg here 
                */}

              <stop offset="100%" stopOpacity="1" stopColor="#333">
                <animate
                  attributeName="offset"
                  values="0;1;1;0"
                  repeatCount="indefinite"
                  repeatDur="05:00"
                  dur="4s"
                  begin="0s"
                />
              </stop>
              <stop offset="100%" stopOpacity="1" stopColor="#E0E0E0">
                <animate
                  attributeName="offset"
                  values="0;1;1;0"
                  repeatCount="indefinite"
                  repeatDur="05:00"
                  dur="4s"
                  begin="0s"
                />
              </stop>
              
              {/* end */}

            </linearGradient>
          </defs>
          <path
            fill="url(#ttb)"
            d="M188.971 175.237L196 145.949V102.018L169.446 56.6225L167.493 36.3165L161.831 41.9788L139.573 9.86013L137.425 20.7941L110.383 4.00262L108.528 14.9366L87.7339 0L82.9502 18.6464L49.953 14.9366L54.1509 23.0395L39.8 24.6015V35.8284L30.5256 41.8811L35.6997 46.7624L23.3014 51.1555L28.2803 56.7201L0.75 102.116V148.292L8.36475 173.87L12.465 165.474V141.361L22.2275 127.986V94.7939L40.6786 70.29H98.8631L156.852 69.8019L175.499 94.9891V127.694L185.261 142.825V165.084L188.971 175.237Z M175.01 147.999L171.203 141.166L159.293 134.43L125.124 137.651L120.243 146.828L128.639 147.999L165.638 143.704L175.01 147.999Z M22.8134 147.999L26.6208 141.166L38.531 134.43L72.6022 137.651L77.4834 146.828L69.0877 147.999L32.1854 143.704L22.8134 147.999Z M140.256 245.039L111.262 235.179L102.28 240.646V221.609L114.776 224.44L146.895 232.445L153.631 250.603L140.256 245.039ZM57.5679 245.039L86.4649 235.179L95.4464 240.646V221.609L82.9504 224.44L50.8317 232.445L44.0956 250.603L57.5679 245.039Z M161.831 229.614L149.921 259.975L132.739 277.255H64.9873L48.7816 260.952L35.8951 229.614L10.7078 202.572L12.1722 229.614L23.3991 265.735L53.4676 296.097V296.389L69.5757 312.009L99.5466 312.4L129.42 312.009L174.23 265.735L185.554 229.614L187.116 202.572L161.831 229.614Z"
          />
        </svg>
        {/* <div className="w-full font-bold text-white transform translate-x-1 mt-4">Loading...</div> */}
      </div>
    </div>
    </div>
  )
}
