import { useState } from "react";
import { useGrocery } from "../../context/groceryContext.jsx";
import EditGroceryItemForm from "./EditGroceryItemForm.jsx";
import './index.css';


const GroceryItemCard = ({ item }) => {
  const { togglePurchased, deleteGroceryItem } = useGrocery();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="grocery-card editing">
        <EditGroceryItemForm 
          item={item} 
          onCancel={() => setIsEditing(false)} 
          onComplete={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`grocery-card ${item.isPurchased ? 'purchased' : ''}`}>
      <div className="card-content">
        <div className="item-main">
          <button
            className={`checkbox ${item.isPurchased ? 'checked' : ''}`}
            onClick={() => togglePurchased(item.id)}
          >
            {item.isPurchased && <span className="check-icon">✓</span>}
          </button>
          
          <div className="item-details">
            <div className="item-header">
              <span className={`item-name ${item.isPurchased ? 'purchased' : ''}`}>
                {item.name}
              </span>
              <span className={`item-quantity ${item.isPurchased ? 'purchased' : ''}`}>
                {item.quantity} {item.unit}
              </span>
              <span className="item-category">{item.category}</span>
            </div>
            {item.notes && (
              <p className={`item-notes ${item.isPurchased ? 'purchased' : ''}`}>
                {item.notes}
              </p>
            )}
          </div>
        </div>
        
        <div className="item-actions">
          <button
            className="icon-button edit"
            title="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="icon-button delete"
            title="Delete"
            onClick={() => deleteGroceryItem(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryItemCard;
