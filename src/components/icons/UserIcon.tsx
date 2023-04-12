export const UserIcon: React.FC<React.SVGAttributes<{}>> = ({ ...props }) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   viewBox="0 0 24 24"
  //   width="24"
  //   height="24"
  //   {...props}
  // >
  //   <path fill="none" d="M0 0h24v24H0z" />
  //   <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
  // </svg>

  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.9997 22C8.04548 22 5.18244 22 3.3237 19.4545C1.46495 16.9091 8.04551 15 11.9997 15C15.9539 15 22.5354 16.9091 20.6762 19.4545C18.8169 21.9999 15.9538 22 11.9997 22Z" />
    <circle cx="12" cy="7" r="5" />
  </svg>
);
