// Import delle funzioni React
import { createContext, useState, useContext, useEffect } from "react";

// Crea un context per il carrello
export const CartContext = createContext();

// Un hook per accedere facilmente al context del carrello
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    // Stato per memorizzare gli articoli nel carrello
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cart')
        return storedCartItems ? JSON.parse(storedCartItems) : []
    });

    useEffect(() => {
        //salva sul local storage
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    // Funzione per aggiungere un prodotto al carrello
    const addToCart = (product) => {
        setCartItems(prev => {
            // Controlla se il prodotto è già nel carrello
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // Se esiste, incrementa la quantità
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Se non esiste, aggiungilo con quantità 1
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // Funzione per rimuovere un prodotto dal carrello
    const removeFromCart = (productId, quantityToRemove = 1) => {
        setCartItems(prev =>
            prev.flatMap(item => {
                if (item.id === productId) {
                    // Se la quantità da rimuovere è maggiore o uguale a quella attuale, rimuovilo
                    if (item.quantity <= quantityToRemove) {
                        return [];
                    }
                    // Altrimenti, diminuisci la quantità
                    return [{ ...item, quantity: item.quantity - quantityToRemove }];
                }
                return [item];
            })
        );
    };

    // Funzione per svuotare completamente il carrello
    const clearCart = () => {
        setCartItems([]);
    };
    // preferiti
    const [prefer, usePrefer] = useState(() => {
        const storedWishListItems = localStorage.getItem('wishlist')
        return storedWishListItems ? JSON.parse(storedWishListItems) : []
    })

    useEffect(() => {
        //salva sul local storage
        localStorage.setItem('wishlist', JSON.stringify(prefer))
    }, [prefer])

    // funzione che aggiunge i preferiti 
    function isPrefer(element) {
        const checkEle = prefer.filter(p => p.id === element.id);

        if (checkEle.length === 0) {

            const newElem = {
                ...element,
                quantity: 1
            }
            usePrefer([...prefer, newElem])
        } else {
            const newArray = []
            prefer.forEach(e => {
                if (e.id !== element.id) {
                    newArray.push(e)
                }
                usePrefer(newArray)
            });

        }
    }
    // funzione per il colore dei preferiti
    function prefercolor(element) {
        const checkEle = prefer.filter(p => p.id === element.id);
        if (checkEle.length > 0) {
            return true
        } else {
            return false
        }
    }

    // Valori e funzioni forniti dal contesto
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, prefercolor, isPrefer, prefer }}>
            {children}
        </CartContext.Provider>
    );
}
