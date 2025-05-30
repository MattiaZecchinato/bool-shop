import { NavLink } from "react-router-dom"
import { useCart } from "../components/CartContext"
function Header() {

    const { cartItems, prefer } = useCart()
    const totalQuantityCart = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const totalQuantityWishList = prefer.reduce((acc, item) => acc + item.quantity, 0)
    return <>

        <header className="bg-secondary">
            <nav className="container navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to='/'>
                        <img src="/bool-shop-logo.png" alt="Logo" width="70" height="70" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/cart" className="btn btn-outline-primary ms-auto">
                                    Carrello ({totalQuantityCart})
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/wish-list" className="btn btn-outline-primary ms-auto">
                                    Wish List ({totalQuantityWishList})
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </header>

    </>
}

export default Header