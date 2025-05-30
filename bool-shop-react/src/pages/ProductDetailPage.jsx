import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetails from "../components/CardDetails";

function ProductDetailPage() {

    const { slug } = useParams();
    const [data, setData] = useState([]);

    const { VITE_BE_PATH } = import.meta.env;

    const url = `${VITE_BE_PATH}/shop`;

    function getData() {
        axios.get(`${url}/${slug}`)
            .then(res => {

                setData(res.data[0]);
            })
            .catch(err => console.log(err));
    }

    useEffect(getData, [slug]);



    return (<>
        {data ? <CardDetails data={data} /> : <p>Nessun prodotto!</p>}
    </>)
}

export default ProductDetailPage;