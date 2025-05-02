import React from 'react';
import PageLayout from "../components/layout/PageLayout.jsx";
import AddGroceryItemForm from "../components/grocery/AddGroceryItemForm.jsx";
import '../styles/pages/home.css';
import '../styles/components/buttons.css';

const Home = ({ setCurrentPage }) => {
  return (
    <PageLayout>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                SmartCart - Your Smart Shopping Companion
              </h1>
              <p className="hero-description">
                Manage your grocery shopping list and discover delicious recipes
                with ingredients you already have. Save time, reduce waste, and
                make shopping a breeze.
              </p>
              <div className="hero-buttons">
                <button 
                  className="btn btn-primary" 
                  onClick={() => setCurrentPage("list")}
                >
                  My Shopping List
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setCurrentPage("recipes")}
                >
                  Find Recipes
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="grocer.png"
                alt="Colorful grocery items"
                className="img-responsive"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="quick-add">
        <div className="container">
          <h2 className="section-title">
            Quick Add to Shopping List
          </h2>
          <div className="form-container">
            <AddGroceryItemForm />
          </div>
        </div>
      </section>


      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Simplify Your Grocery Shopping?
            </h2>
            <p className="cta-description">
              Start managing your shopping list and discovering new recipes today.
              No more forgotten items or wasted ingredients!
            </p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => setCurrentPage("list")}
              >
                Get Started
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => setCurrentPage("contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home; 