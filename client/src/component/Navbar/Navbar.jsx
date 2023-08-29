import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li className="logo">
            <Link to="./index">Hỏi.MịeĐê!</Link>
          </li>
          <li>
            <Link to="./ask">Hỏi nhanh</Link>
          </li>
          <li>
            <Link to="./detail">Đáp gọn!</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
