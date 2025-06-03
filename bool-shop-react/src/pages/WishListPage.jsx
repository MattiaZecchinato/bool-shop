import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import CardWishList from "../components/CardWishList";
import ball from "../assets/crystal-ball.png";

function WishListPage() {

    const { prefer } = useContext(CartContext)

    return <>
        <div className="container py-4 text-white row gap-2 width-whish-container justify-content-center">
            <div className="d-flex align-items-center gap-2">
                <h2 className="mb-5">Wishlist</h2>
                <img src={ball} alt="ball-wish" style={{ width: "50px" }} className="mb-5" />
            </div>
            {prefer.length > 0 ? prefer.map(elem => <CardWishList key={elem.id} data={elem} />) : <p>La wish list è vuota.</p>}
        </div>
    </>
}

export default WishListPage