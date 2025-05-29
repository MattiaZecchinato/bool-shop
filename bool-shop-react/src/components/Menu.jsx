import { NavLink } from "react-router-dom";

function Menu() {

    return (
        <nav>
            <ul className="list-unstyled">
                <li>
                    <NavLink className="nav-link" to='/search/%20/price'>Il Nostro Catalogo</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to='/boardgames'>Giochi da tavolo</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to='/puzzles'>Puzzle</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;