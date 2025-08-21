import React, { useEffect, useState } from "react";
import PizzaList from "./PizzaList";
import PizzaForm from "./PizzaForm";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  // Fetch pizzas from backend
  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, []);

  // Select pizza for editing
  function handleEditPizza(pizza) {
    setSelectedPizza(pizza);
  }

  // Update pizza in backend + state
  function handleUpdatePizza(updatedPizza) {
    fetch(`http://localhost:3001/pizzas/${updatedPizza.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPizza),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update local state
        setPizzas((pizzas) =>
          pizzas.map((p) => (p.id === data.id ? data : p))
        );
        setSelectedPizza(null); // clear form
      });
  }

  return (
    <div className="App">
      <h1>🍕 Flatiron Pizzeria Menu</h1>
      <PizzaForm
        pizza={selectedPizza}
        onUpdatePizza={handleUpdatePizza}
      />
      <PizzaList pizzas={pizzas} onEditPizza={handleEditPizza} />
    </div>
  );
}

export default App;