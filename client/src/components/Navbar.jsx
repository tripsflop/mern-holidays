import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/holidays">Holidays</Link>
        </li>
        <li>
          <Link to="/holidays/aaa">Edit Holidays</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
