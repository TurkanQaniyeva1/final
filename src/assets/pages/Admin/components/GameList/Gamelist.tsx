import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselData } from "../../../../store/actions/carouselAction";
import { selectCarouselItems } from "../../../../store/Selectors/carouselSelector";
import axios from "axios";
import "./game.css";

interface Game {
  id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  media: string;
}

const Notification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <div
      className="notification"
      style={{
        animation: "fadeInOut 3s",
        backgroundColor: "green",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: "10px",
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>
  );
};

const GameList: React.FC = () => {
  const dispatch = useDispatch();
  const itemsFromStore = useSelector(selectCarouselItems);
  const [games, setGames] = useState<Game[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newGame, setNewGame] = useState<Game>({
    name: "",
    price: 0,
    image: "",
    category: "",
    description: "",
    media: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCarouselData("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"));
  }, [dispatch]);

  useEffect(() => {
    setGames(itemsFromStore);
  }, [itemsFromStore]);

  const saveGame = async () => {
    try {
      if (isEditing) {
        console.log("Editing game:", newGame);
        const response = await axios.put(
          `https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games/${newGame.id}`,
          {
            name: newGame.name,
            price: newGame.price,
            image: newGame.image,
            category: newGame.category,
            description: newGame.description,
            media: newGame.media,
          }
        );
        console.log("Edit response:", response.data);
        setNotification("Game updated successfully!");
      } else {
        const response = await axios.post(
          "https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games",
          newGame
        );
        console.log("Add response:", response.data);
        setNotification("Game added successfully!");
      }

      dispatch(fetchCarouselData("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"));
      setShowModal(false);
      setNewGame({
        name: "",
        price: 0,
        image: "",
        category: "",
        description: "",
        media: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving game:", error);
      setNotification("Error saving the game!");
    }
  };

  const deleteGame = async (id: string) => {
    try {
      await axios.delete(`https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games/${id}`);
      dispatch(fetchCarouselData("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"));
      setNotification("Game deleted successfully!");
    } catch (error) {
      console.error("Error deleting game:", error);
      setNotification("Error deleting the game!");
    }
  };

  const openEditModal = (game: Game) => {
    setNewGame(game);
    setIsEditing(true);
    setShowModal(true);
  };

  if (!itemsFromStore.length) return <div>Loading...</div>;

  return (
    <div className="game-list-container">
      <h3 className="game-list-title">Games</h3>
      <button onClick={() => setShowModal(true)} className="add-game-button">
        Add Game
      </button>
      <ul className="game-list">
        {games.map((game) => (
          <li
            key={game.id}
            className="game-list-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div>
              <strong>{game.name}</strong> - ${game.price.toFixed(2)}<br />
              <span>{game.category}</span> - <small>{game.description}</small>
            </div>
            <div>
              <button
                onClick={() => openEditModal(game)}
                className="edit-game-button"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteGame(game.id!)}
                className="delete-game-button"
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{isEditing ? "Edit Game" : "Add a New Game"}</h3>
            <label>Game Name:</label>
            <input
              type="text"
              value={newGame.name}
              onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
            />
            <label>Price:</label>
            <input
              type="number"
              value={newGame.price}
              onChange={(e) => setNewGame({ ...newGame, price: parseFloat(e.target.value) })}
            />
            <label>Image URL:</label>
            <input
              type="text"
              value={newGame.image}
              onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
            />
            <label>Category:</label>
            <input
              type="text"
              value={newGame.category}
              onChange={(e) => setNewGame({ ...newGame, category: e.target.value })}
            />
            <label>Description:</label>
            <input
              type="text"
              value={newGame.description}
              onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
            />
            <label>Media URL:</label>
            <input
              type="text"
              value={newGame.media}
              onChange={(e) => setNewGame({ ...newGame, media: e.target.value })}
            />
            <button onClick={saveGame} className="save-button">
              Save
            </button>
            <button onClick={() => setShowModal(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}

      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}
    </div>
  );
};

export default GameList;
