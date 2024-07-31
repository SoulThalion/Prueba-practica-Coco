const MenuIcon = () => {
  return (
    <>
      <svg
        data-slot="icon"
        className="w-6 h-6"
        fill="none"
        strokeWidth="1.5"
        stroke="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        ></path>
      </svg>
    </>
  );
};

export default MenuIcon;
