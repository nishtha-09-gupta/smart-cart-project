import PageLayout from "../components/layout/PageLayout.jsx";
import { useGrocery } from "../context/groceryContext.jsx";
import AddGroceryItemForm from "../components/grocery/AddGroceryItemForm.jsx";
import GroceryItemCard from "../components/grocery/GroceryItemCard.jsx";

const ListPage = () => {
  const { groceryItems, clearAllItems } = useGrocery();
  const totalCount = groceryItems.length;

  const sortedItems = groceryItems.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <PageLayout>
      <div className="container">
        <div className="list-container">
          <div className="list-header">
            <h2 className="list-title">My Shopping List</h2>
            <div className="list-actions">
              <button 
                className="btn btn-danger"
                onClick={clearAllItems}
                disabled={totalCount === 0}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="add-item-section">
            <AddGroceryItemForm />
          </div>

          {groceryItems.length === 0 ? (
            <div className="empty-list">
              <p>Your shopping list is empty</p>
              <p>Use the form above to add items to your list</p>
            </div>
          ) : (
            <div className="items-list">
              {sortedItems.map((item) => (
                <GroceryItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ListPage; 