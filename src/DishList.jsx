import React, { useEffect, useState } from 'react';

const DishList = ({ restaurantId }) => {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setDishes(data);
        } else {
          console.error('Błąd podczas pobierania danych o daniach');
        }
      } catch (error) {
        console.error('Wystąpił błąd', error);
      }
    };

    fetchDishes();
  }, [restaurantId]);

  if (!dishes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Dishes</h3>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            <h4>{dish.name}</h4>
            <p>Description: {dish.description}</p>
            <p>Price: {dish.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;
