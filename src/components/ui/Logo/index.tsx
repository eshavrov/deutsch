const Logo = ({ className = "", ...props }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="100%" height="100%" rx="16" fill="var(--secondary)" />
  </svg>
);

const Logo2 = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512"
    className={className}
    {...props}
  >
    <g fill="#000">
      <path d="M496.077 166.957C459.906 69.473 366.071 0 256 0S52.094 69.473 15.923 166.957h480.154z" />
    </g>
    <g fill="#f5c800">
      <path d="M15.923 345.043C52.094 442.527 -145.929 512 256 512s203.906-69.473 240.077-166.957H15.923z" />
    </g>
    <path
      d="M0 256c0 31.314 5.633 61.31 15.923 89.043 L256 357.304l240.077-12.261 C506.367 317.31 512 287.314 512 256s-5.633-61.31-15.923-89.043 L256 144.696 15.923 166.957C5.633 194.69 0 224.686 0 256z"
      fill="#d60403"
    />
  </svg>
);

export default Logo2;
