import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetails from "../components/CardDetails";
import CardProductList from "../components/CardProductList";

function ProductDetailPage() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    const [dataDettail, setDataDettail] = useState([]);
    const [loading, setLoading] = useState(true);


    const { VITE_BE_PATH } = import.meta.env;

    const url = `${VITE_BE_PATH}/shop`;

    function getData() {
        setLoading(true);
        axios.get(`${url}/${slug}`)
            .then(res => {
                setData(res.data[0]);
                getDataDettail(res.data[0]);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    function getDataDettail(cat) {
        console.log(cat.categories);

        const requests = cat.categories.map(element => {
            const sarch = {
                "category_id": element.id
            };
            return axios.post(`${VITE_BE_PATH}/shop/category`, sarch);
        });

        Promise.all(requests)
            .then(responses => {
                const allData = responses.flatMap(res => res.data.products);
                setDataDettail(allData);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    useEffect(getData, [slug]);



    const arraycheck = []
    dataDettail.forEach(element => {
        const ceck = arraycheck.find(e => e.id === element.id);
        if (!ceck) {
            arraycheck.push(element);
        }
    });

    const finalArray = []

    arraycheck.forEach(element => {
        if (element.id !== data.id) {
            finalArray.push(element)
        }
    });


    console.log(arraycheck, "array controllato ");



    return (
        <>
            {loading ? (
                <h3>Caricamento in corso...</h3>
            ) : (
                <>
                    {data ? <CardDetails data={data} /> : <p>Nessun prodotto!</p>}
                    <h3>Prodotti correlati</h3>
                    {dataDettail && dataDettail.length > 0 ? (
                        finalArray.map((e) => <CardProductList key={e.id} data={e} />)
                    ) : (
                        <p>Nessun prodotto correlato!</p>
                    )}
                </>
            )}
        </>
    );
}

export default ProductDetailPage;