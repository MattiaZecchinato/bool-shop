import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import CardWishList from "../components/CardWishList";
import ball from "../assets/crystal-ball.png";
import sadUnicorn from "../assets/unicorn-sad.png";

function WishListPage() {

    const { prefer } = useContext(CartContext)

    return <>
        <div className="container py-4 text-white row gap-2 width-whish-container justify-content-center">
            <div className="d-flex align-items-center gap-2">
                <h2 className="mb-5">Wishlist</h2>
                <img src={ball} alt="ball-wish" style={{ width: "50px" }} className="mb-5" />
            </div>
            {prefer.length > 0 ? prefer.map(elem => <CardWishList key={elem.id} data={elem} />) :
                <div className="container bg-light fst-italic p-5 rounded rounded-3 d-flex align-items-center gap-2 justify-content-center" style={{ maxWidth: "600px" }}>
                    <p className="text-dark fst-italic text-center fs-5 my-auto">La Wishlist è vuota.</p>
                    <img src={sadUnicorn} alt="sad-unicorn" style={{ width: "50px" }} />
                </div>}
        </div>
    </>
}

export default WishListPage