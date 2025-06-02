import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Menu() {

    return (
        <nav className="container mb-5 nav-style">
            <ul className="list-unstyled d-flex justify-content-center gap-3 menu-list">
                <li>
                    <NavLink className="nav-link" to='/search'>Catalogo</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to='/boardgames'>Giochi da tavolo</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to='/puzzles'>Puzzle</NavLink>
                </li>
                <li>
                    <div className="cat-style">
                        <Link type="button" aria-expanded="false">
                            Categorie
                        </Link>
                        <ul className="d-flex ul-nav-style m-0">
                            <li>
                                <ul className="p-0 ul-style-drop">
                                    <li><NavLink to='/category/1' >Strategia</NavLink></li>
                                    <li><NavLink to='/category/2' >Famiglia</NavLink></li>
                                    <li><NavLink to='/category/3' >Party</NavLink></li>
                                    <li><NavLink to='/category/4' >Puzzle</NavLink></li>
                                    <li><NavLink to='/category/5' >Classici</NavLink></li>
                                </ul>
                            </li>
                            <li>
                                <ul className="p-0 ul-style-drop">
                                    <li><NavLink to='/category/6' >Bambini</NavLink></li>
                                    <li><NavLink to='/category/7' >Educativi</NavLink></li>
                                    <li><NavLink to='/category/8' >Avventura</NavLink></li>
                                    <li><NavLink to='/category/9' >Carte</NavLink></li>
                                    <li><NavLink to='/category/10' >Puzzle 3D</NavLink></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;