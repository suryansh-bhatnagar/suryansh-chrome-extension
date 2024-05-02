import * as React from "react"
const MagicIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <rect width={32} height={32} x={5} y={1} fill="#fff" rx={16} />
      <path
        fill="#2563EB"
        d="M28.467 18.733c0 .154-.06.3-.168.409a.57.57 0 0 1-.405.17h-1.146v1.155c0 .153-.06.3-.168.408a.57.57 0 0 1-.81 0 .58.58 0 0 1-.167-.408V19.31h-1.146a.57.57 0 0 1-.405-.17.58.58 0 0 1 .405-.985h1.146V17a.57.57 0 1 1 1.146 0v1.155h1.145a.57.57 0 0 1 .405.17.58.58 0 0 1 .168.408Zm-13.748-5.777h1.146v1.155a.57.57 0 1 0 1.146 0v-1.155h1.145a.57.57 0 0 0 .405-.17.58.58 0 0 0-.405-.986H17.01v-1.156a.58.58 0 0 0-.168-.408.57.57 0 0 0-.81 0 .58.58 0 0 0-.167.408V11.8h-1.146a.57.57 0 0 0-.405.17.58.58 0 0 0 .405.986Zm9.165 8.666h-.573v-.578a.58.58 0 0 0-.168-.408.57.57 0 0 0-.81 0 .58.58 0 0 0-.167.408v.578h-.573a.57.57 0 0 0-.405.17.58.58 0 0 0 .405.986h.573v.578a.57.57 0 1 0 1.146 0v-.578h.572a.57.57 0 0 0 .405-.17.58.58 0 0 0-.405-.986Zm2.528-8.089-9.974 10.062a1.141 1.141 0 0 1-1.62 0L13.336 22.1a1.157 1.157 0 0 1-.249-1.26c.058-.14.142-.267.249-.374l9.975-10.062a1.145 1.145 0 0 1 1.249-.25c.139.058.265.143.372.25l1.48 1.494a1.157 1.157 0 0 1 .249 1.26c-.058.14-.142.267-.249.374Zm-.81-.816-1.48-1.495-2.292 2.311 1.481 1.495 2.292-2.312Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={42}
        height={42}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          radius={1}
          result="effect1_dropShadow_3_37"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={3} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3_37" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          radius={2}
          result="effect2_dropShadow_3_37"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend
          in2="effect1_dropShadow_3_37"
          result="effect2_dropShadow_3_37"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_3_37"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default MagicIcon
