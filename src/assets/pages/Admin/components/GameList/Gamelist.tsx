import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselData } from "../../../../store/actions/carouselAction";
import { selectCarouselItems } from "../../../../store/Selectors/carouselSelector";
import axios from "axios"; // Axios API çağırışları üçün istifadə olunur
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

  useEffect(() => {
    dispatch(fetchCarouselData("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"));
  }, [dispatch]);

  useEffect(() => {
    setGames(itemsFromStore);
  }, [itemsFromStore]);

  // Yeni oyun əlavə etmək və ya mövcud oyunu redaktə etmək üçün
  const saveGame = async () => {
    try {
      if (isEditing) {
        // Redaktə edilən oyun üçün PUT sorğusu
        await axios.put(
          `https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games/${newGame.id}`,
          newGame
        );
      } else {
        // Yeni oyun üçün POST sorğusu
        await axios.post("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games", newGame);
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
    }
  };

  const deleteGame = async (id: string) => {
    try {
      await axios.delete(`https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games/${id}`);
      dispatch(fetchCarouselData("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"));
    } catch (error) {
      console.error("Error deleting game:", error);
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
    </div>
  );
};

export default GameList;
