const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-purple-900 flex justify-between items-center w-full h-16 px-6 shadow-md z-50">
      <div className="font-bold text-3xl text-white">iTask</div>
      <ul className="flex gap-6 font-bold text-white">
        <li>Home</li>
        <li>Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
