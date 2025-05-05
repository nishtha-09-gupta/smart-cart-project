import React from 'react';
import { useState } from "react";
import { useGrocery } from "../../context/groceryContext.jsx";
import GroceryItemCard from "./GroceryItemCard.jsx";
import AddGroceryItem from "./AddGroceryItem.jsx";


const GROCERY_CATEGORIES = [
  "Produce", 
  "Dairy", 
  "Meat & Seafood", 
  "Bakery", 
  "Pantry", 
  "Frozen", 
  "Beverages", 
  "Household", 
  "Other"
];

const GroceryList = () => {
  const { groceryItems, clearPurchasedItems, clearAllItems } = useGrocery();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showAddForm, setShowAddForm] = useState(false);
  
  const filteredItems = groceryItems
    .filter((item) => {
  
      if (filter !== "all" && filter !== "purchased" && filter !== item.category) {
        return false;
      }
      
    
      if (filter === "purchased" && !item.isPurchased) {
        return false;
      }
      
 
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const itemName = item.name.toLowerCase();
        const itemCategory = item.category.toLowerCase();
        const itemNotes = (item.notes || '').toLowerCase();
        
        return itemName.includes(searchLower) || 
               itemCategory.includes(searchLower) || 
               itemNotes.includes(searchLower);
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      } else {
        return b.createdAt - a.createdAt;
      }
    });

  const purchasedCount = groceryItems.filter((item) => item.isPurchased).length;
  const totalCount = groceryItems.length;

  return (
    <div className="grocery-list">
      <div className="list-header">
        <h2 className="list-title">Your Items</h2>
        <div className="list-actions">
          <button 
            className="btn btn-secondary"
            onClick={clearPurchasedItems}
            disabled={purchasedCount === 0}
          >
            Clear Purchased
          </button>
          <button 
            className="btn btn-danger"
            onClick={clearAllItems}
            disabled={totalCount === 0}
          >
            Clear All
          </button>
        </div>
      </div>
      
      {groceryItems.length === 0 ? (
        <div className="empty-list">
          <p>Your grocery list is empty</p>
          <button 
            className="get-started-btn"
            onClick={() => setShowAddForm(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Get Started
          </button>
          {showAddForm && (
            <AddGroceryItem 
              onClose={() => setShowAddForm(false)}
              categories={GROCERY_CATEGORIES}
            />
          )}
        </div>
      ) : (
        <div className="items-list">
          {filteredItems.map((item) => (
            <GroceryItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroceryList;
