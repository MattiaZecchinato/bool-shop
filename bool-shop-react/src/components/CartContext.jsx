// Import delle funzioni React
import { createContext, useState, useContext } from "react";

// Crea un context per il carrello
const CartContext = createContext();

// Un hook per accedere facilmente al context del carrello
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    // Stato per memorizzare gli articoli nel carrello
    const [cartItems, setCartItems] = useState([]);

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

    // Valori e funzioni forniti dal contesto
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
