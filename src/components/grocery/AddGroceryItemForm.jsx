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

const AddGroceryItemForm = () => {
  const { addGroceryItem } = useGrocery();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    unit: "pcs",
    category: "Other",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [item, setItem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
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
    if (item.trim()) {
      // TODO
      console.log('Adding item:', item);
      setItem('');
    } else {
      const newErrors = validate();
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      addGroceryItem({
        ...formData,
        quantity: Number(formData.quantity),
        isPurchased: false,
      });
      
      // Reset form
      setFormData({
        name: "",
        quantity: 1,
        unit: "pcs",
        category: "Other",
        notes: "",
      });
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="form-toggle-container">
        <button 
          onClick={() => setIsOpen(true)}
          className="btn btn-primary btn-full"
        >
          Add New Item
        </button>
      </div>
    );
  }

  return (
    <div className="grocery-form-container">
      <h3 className="form-title">Add New Item</h3>
      <form onSubmit={handleSubmit} className="grocery-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Item Name</label>
            <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Apples"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input 
                type="number"
                id="quantity"
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
              <label htmlFor="unit" className="form-label">Unit</label>
              <select
                id="unit"
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
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
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
          <label htmlFor="notes" className="form-label">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special instructions or details..."
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default AddGroceryItemForm;
