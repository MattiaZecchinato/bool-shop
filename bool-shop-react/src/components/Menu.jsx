import { NavLink } from "react-router-dom";

function Menu() {

    return (
        <nav className="container mb-5">
            <ul className="list-unstyled d-flex justify-content-center gap-3">
                <li>
                    <NavLink className="nav-link" to='/search'>Il Nostro Catalogo</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to='/boardgames'>Giochi da tavolo</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to='/puzzles'>Puzzle</NavLink>
                </li>
                <li>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categorie
                        </button>
                        <ul className="dropdown-menu">
                            <li><NavLink to='/category/1' className="dropdown-item">Strategia</NavLink></li>
                            <li><NavLink to='/category/2' className="dropdown-item">Famiglia</NavLink></li>
                            <li><NavLink to='/category/3' className="dropdown-item">Party</NavLink></li>
                            <li><NavLink to='/category/4' className="dropdown-item">Puzzle</NavLink></li>
                            <li><NavLink to='/category/5' className="dropdown-item">Classici</NavLink></li>
                            <li><NavLink to='/category/6' className="dropdown-item">Bambini</NavLink></li>
                            <li><NavLink to='/category/7' className="dropdown-item">Educativi</NavLink></li>
                            <li><NavLink to='/category/8' className="dropdown-item">Avventura</NavLink></li>
                            <li><NavLink to='/category/9' className="dropdown-item">Carte</NavLink></li>
                            <li><NavLink to='/category/10' className="dropdown-item">Puzzle 3D</NavLink></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;