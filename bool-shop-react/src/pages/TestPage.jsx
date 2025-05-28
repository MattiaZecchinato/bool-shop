import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CardProductList from "../components/CardProductList";
import CardProduct from "../components/CardProduct";

function TestPage() {

    const [display, setDisplay] = useState(true)

    const dataDemo = [
        {
            name: "Adventure Quest",
            description: "Un gioco di avventura pieno di missioni e scoperte.",
            price: 29.99,
            game_type: "Avventura",
            target_age: "12+"
        },
        {
            name: "Space Racers",
            description: "Corse futuristiche tra le stelle con veicoli spaziali.",
            price: 24.99,
            game_type: "Corsa",
            target_age: "10+"
        },
        {
            name: "Math Mania",
            description: "Sfide matematiche per allenare la mente divertendosi.",
            price: 14.99,
            game_type: "Educativo",
            target_age: "8+"
        },
        {
            name: "Zombie Survival",
            description: "Sopravvivi all’apocalisse zombie con il tuo team.",
            price: 39.99,
            game_type: "Azione",
            target_age: "16+"
        },
        {
            name: "Puzzle World",
            description: "Un mondo di enigmi e rompicapi da risolvere.",
            price: 19.99,
            game_type: "Puzzle",
            target_age: "10+"
        },
        {
            name: "Kingdom Builder",
            description: "Costruisci il tuo regno e conquista nuovi territori.",
            price: 34.99,
            game_type: "Strategia",
            target_age: "13+"
        },
        {
            name: "Pet Simulator",
            description: "Alleva, cura e gioca con animali virtuali adorabili.",
            price: 17.99,
            game_type: "Simulazione",
            target_age: "6+"
        },
        {
            name: "Fantasy Battle",
            description: "Combattimenti epici in un mondo fantasy magico.",
            price: 44.99,
            game_type: "GDR",
            target_age: "14+"
        },
        {
            name: "City Planner",
            description: "Progetta e gestisci la tua città ideale.",
            price: 27.99,
            game_type: "Simulazione",
            target_age: "12+"
        },
        {
            name: "Alien Invasion",
            description: "Difendi la Terra da un’invasione aliena imminente.",
            price: 31.99,
            game_type: "Sparatutto",
            target_age: "15+"
        },
        {
            name: "Word Wizard",
            description: "Gioco di parole per migliorare il vocabolario divertendosi.",
            price: 11.99,
            game_type: "Educativo",
            target_age: "7+"
        }
    ]

    return <>
        <div className="btn-group" role="group" aria-label="btn-group">
            <button type="button" className="btn btn-primary" value="grid" onClick={() => setDisplay(true)}><FontAwesomeIcon icon={faGrip} /></button>
            <button type="button" className="btn btn-primary" value="list" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faListUl} /></button>
        </div>

        <div className={display ? 'd-flex flex-wrap' : ''}>
            {dataDemo.map((elem, i) => display ? <CardProduct key={i} data={elem} /> : <CardProductList key={i} data={elem} />)}
        </div>
    </>
}

export default TestPage