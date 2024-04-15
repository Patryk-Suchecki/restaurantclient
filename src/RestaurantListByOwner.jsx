import React, { useEffect, useState } from 'react';

const RestaurantListByOwner = ({ tokenStorage }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [dishes, setDishes] = useState({});
  const [newDish, setNewDish] = useState({});

  useEffect(() => {
    const fetchRestaurantsByOwner = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/restaurant/own', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenStorage.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
          data.forEach(restaurant => {
            fetchDishes(restaurant.id);
          });
        } else {
          console.error('Failed to fetch restaurants');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantsByOwner();
  }, [tokenStorage]);

  const fetchDishes = async (restaurantId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStorage.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDishes(prevState => ({
          ...prevState,
          [restaurantId]: data
        }));
      } else {
        console.error(`Failed to fetch dishes for restaurant with id ${restaurantId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (restaurantId, id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStorage.token}`
        }
      });

      if (response.ok) {
        setDishes(prevState => ({
          ...prevState,
          [restaurantId]: prevState[restaurantId].filter(dish => dish.id !== id)
        }));
      } else {
        console.error(`Failed to delete dish with id ${id}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (restaurantId, id, newData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStorage.token}`
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        const updatedDishes = dishes[restaurantId].map(dish => {
          if (dish.id === id) {
            return { ...dish, ...newData };
          }
          return dish;
        });
        setDishes(prevState => ({
          ...prevState,
          [restaurantId]: updatedDishes
        }));
      } else {
        console.error(`Failed to update dish with id ${id}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAdd = async (restaurantId, newData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStorage.token}`
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        const data = await response.json();
        setDishes(prevState => ({
          ...prevState,
          [restaurantId]: [...prevState[restaurantId], data]
        }));
      } else {
        console.error(`Failed to add dish for restaurant with id ${restaurantId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
            <button onClick={() => setEditMode(prevState => ({ ...prevState, [restaurant.id]: true }))}>Edit</button>
            {editMode[restaurant.id] && (
              <div>
                <input
                  type="text"
                  placeholder="New Name"
                  value={updatedData[restaurant.id]?.name || ''}
                  onChange={(e) => setUpdatedData({ ...updatedData, [restaurant.id]: { ...updatedData[restaurant.id], name: e.target.value } })}
                />
                <input
                  type="text"
                  placeholder="New Description"
                  value={updatedData[restaurant.id]?.description || ''}
                  onChange={(e) => setUpdatedData({ ...updatedData, [restaurant.id]: { ...updatedData[restaurant.id], description: e.target.value } })}
                />
                <input
                  type="number"
                  placeholder="New Delivery Distance"
                  value={updatedData[restaurant.id]?.deliveryDistance || ''}
                  onChange={(e) => setUpdatedData({ ...updatedData, [restaurant.id]: { ...updatedData[restaurant.id], deliveryDistance: e.target.value } })}
                />
                <button onClick={() => handleUpdate(restaurant.id, updatedData[restaurant.id])}>Save</button>
              </div>
            )}
            <ul>
              {dishes[restaurant.id]?.map((dish) => (
                <li key={dish.id}>
                  <h4>{dish.name}</h4>
                  <button onClick={() => handleDelete(restaurant.id, dish.id)}>Delete</button>
                  <button onClick={() => setEditMode(prevState => ({ ...prevState, [dish.id]: true }))}>Edit</button>
                  {editMode[dish.id] && (
                    <div>
                      <input
                        type="text"
                        placeholder="New Name"
                        value={updatedData[dish.id]?.name || ''}
                        onChange={(e) => setUpdatedData({ ...updatedData, [dish.id]: { ...updatedData[dish.id], name: e.target.value } })}
                      />
                      <input
                        type="text"
                        placeholder="New Description"
                        value={updatedData[dish.id]?.description || ''}
                        onChange={(e) => setUpdatedData({ ...updatedData, [dish.id]: { ...updatedData[dish.id], description: e.target.value } })}
                      />
                      <input
                        type="number"
                        placeholder="New Price"
                        value={updatedData[dish.id]?.price || ''}
                        onChange={(e) => setUpdatedData({ ...updatedData, [dish.id]: { ...updatedData[dish.id], price: e.target.value } })}
                      />
                      <button onClick={() => handleUpdate(restaurant.id, dish.id, updatedData[dish.id])}>Save</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={newDish[restaurant.id]?.name || ''}
                onChange={(e) => setNewDish({ ...newDish, [restaurant.id]: { ...newDish[restaurant.id], name: e.target.value } })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newDish[restaurant.id]?.description || ''}
                onChange={(e) => setNewDish({ ...newDish, [restaurant.id]: { ...newDish[restaurant.id], description: e.target.value } })}
              />
              <input
                type="number"
                placeholder="Price"
                value={newDish[restaurant.id]?.price || ''}
                onChange={(e) => setNewDish({ ...newDish, [restaurant.id]: { ...newDish[restaurant.id], price: e.target.value } })}
              />
              <button onClick={() => handleAdd(restaurant.id, newDish[restaurant.id])}>Add</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantListByOwner;
