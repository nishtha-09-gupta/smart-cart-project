import { createContext, useContext, useState, useEffect } from "react";

const GroceryContext = createContext();

export const useGrocery = () => {
  return useContext(GroceryContext);
};

export const GroceryProvider = ({ children }) => {
  const [groceryItems, setGroceryItems] = useState(() => {
    const savedItems = localStorage.getItem('groceryItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
  }, [groceryItems]);

  const addGroceryItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setGroceryItems([...groceryItems, newItem]);
  };

  const updateGroceryItem = (id, updatedItem) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteGroceryItem = (id) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
  };

  const togglePurchased = (id) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      )
    );
  };

  const clearPurchasedItems = () => {
    setGroceryItems(groceryItems.filter((item) => !item.isPurchased));
  };

  const clearAllItems = () => {
    setGroceryItems([]);
  };

  return (
    <GroceryContext.Provider
      value={{
        groceryItems,
        addGroceryItem,
        updateGroceryItem,
        deleteGroceryItem,
        togglePurchased,
        clearPurchasedItems,
        clearAllItems,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};
