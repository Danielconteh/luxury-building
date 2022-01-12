import Link from 'next/link'
const Footer = () => {
  return (
    <div className="footer">
      <div className="logo_icon">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          // width="153.000000pt"
          // height="106.000000pt"
          width="8.5rem"
          height="5rem"
          viewBox="0 0 153.000000 106.000000"
          preserveAspectRatio="xMidYMid meet">
          <g
            transform="translate(0.000000,106.000000) scale(0.100000,-0.100000)"
            fill="#ad102f"
            stroke="none">
            <path
              d="M312 530 l-300 -520 740 0 c406 0 737 3 735 8 -2 4 -107 186 -233
              405 -202 351 -230 396 -241 380 -7 -9 -39 -62 -70 -116 -45 -79 -58 -96 -68
              -85 -6 7 -67 110 -135 228 -67 118 -124 216 -125 218 -1 1 -138 -231 -303
              -518z m424 220 c68 -117 113 -203 111 -216 -2 -11 -64 -125 -138 -252 l-134
              -232 -243 0 -244 0 34 59 c236 416 485 840 492 838 5 -2 60 -90 122 -197z
              m487 -360 c97 -168 179 -314 183 -323 6 -16 -2 -17 -106 -15 l-112 3 -139 242
              -140 242 56 96 c51 86 58 95 69 78 7 -10 92 -155 189 -323z m-214 -115 l121
              -210 -241 -3 c-133 -1 -244 0 -246 2 -3 2 50 99 117 216 67 116 124 210 125
              208 2 -2 58 -97 124 -213z"
            />
          </g>
        </svg>
      </div>

      <div className="footer_item">
        <a>expand your business</a>
        <a>building plane</a>
        <a>find your dream home</a>
        <a>build confidence in us!</a>
        <a>build your future</a>
        <a>come work with us!</a>
      </div>
      <div className="Copyright">
        &copy; Copyright {new Date().getFullYear()} by Daniel Conteh
      </div>
    </div>
  );
}

export default Footer
