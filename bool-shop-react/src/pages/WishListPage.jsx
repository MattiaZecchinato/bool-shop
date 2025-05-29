import { CartContext } from "../components/CartContext"
import { useContext } from "react";
import CardProductList from "../components/CardProductList";

function WishListPage() {

    const { prefer } = useContext(CartContext)

    return <>
        <div className="container py-4">
            <h2>Wish List</h2>
            {prefer.length > 0 ? prefer.map(elem => <CardProductList key={elem.id} data={elem} />) : <p>La wish list è vuota.</p>}
        </div>
    </>
}

export default WishListPage