import React, { useState } from 'react';
import { useGrocery } from '../../context/groceryContext.jsx';

const AddGroceryItem = ({ onClose, categories = [] }) => {
  const { addGroceryItem } = useGrocery();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: categories.length > 0 ? categories[0] : 'Other',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addGroceryItem({
      ...formData,
      id: Date.now(),
      isPurchased: false,
      createdAt: Date.now()
    });

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="add-item-modal">
      <div className="add-item-content">
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h3>Add New Item</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="required-field">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 2 kg, 1 pack"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGroceryItem; 