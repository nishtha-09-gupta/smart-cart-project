import { useState } from "react";
import { useGrocery } from "../../context/groceryContext.jsx";


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

const COMMON_UNITS = [
  "pcs",
  "lbs",
  "oz",
  "kg",
  "g",
  "ml",
  "L",
  "cups",
  "tbsp",
  "tsp",
  "bunch",
  "can",
  "box",
  "bag",
  "bottle",
  "package",
];

const EditGroceryItemForm = ({ item, onCancel, onComplete }) => {
  const { updateGroceryItem } = useGrocery();
  const [formData, setFormData] = useState({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    category: item.category,
    notes: item.notes || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Item name is required";
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }
    if (!formData.unit) {
      newErrors.unit = "Unit is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    updateGroceryItem(item.id, {
      ...formData,
      quantity: Number(formData.quantity),
    });
    
    onComplete();
  };

  return (
    <div className="edit-form-container">
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-name" className="form-label">Item Name</label>
            <input 
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="edit-quantity" className="form-label">Quantity</label>
              <input 
                type="number"
                id="edit-quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                className={`form-input ${errors.quantity ? 'error' : ''}`}
              />
              {errors.quantity && <div className="error-message">{errors.quantity}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="edit-unit" className="form-label">Unit</label>
              <select
                id="edit-unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className={`form-select ${errors.unit ? 'error' : ''}`}
              >
                {COMMON_UNITS.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              {errors.unit && <div className="error-message">{errors.unit}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="edit-category" className="form-label">Category</label>
          <select
            id="edit-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-select ${errors.category ? 'error' : ''}`}
          >
            {GROCERY_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="edit-notes" className="form-label">Notes (Optional)</label>
          <textarea
            id="edit-notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditGroceryItemForm;
