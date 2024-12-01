import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselData } from "../../../../store/actions/carouselAction";
import "./game.css";
import { selectCarouselItems } from "../../../../store/Selectors/carouselSelector";

const GameList: React.FC = () => {
  const dispatch = useDispatch();
  const itemsFromStore = useSelector(selectCarouselItems);
  const [games, setGames] = useState<{ name: string; price: number }[]>([]);

  useEffect(() => {
    dispatch(fetchCarouselData("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"));
  }, [dispatch]);

  useEffect(() => {
    setGames(
      itemsFromStore.map((item) => ({
        ...item,
        price: parseFloat(item.price.toFixed(2)),
      }))
    );
  }, [itemsFromStore]);

  const addGame = () => {
    const newGame = { name: "Yeni Oyun", price: parseFloat((Math.random() * 50).toFixed(2)) };
    setGames([...games, newGame]);
  };

  const deleteGame = (index: number) => {
    setGames(games.filter((_, i) => i !== index));
  };

  if (!itemsFromStore.length) return <div>Loading...</div>;

  return (
    <div className="game-list-container">
      <h3 className="game-list-title">Oyunlar</h3>
      <button onClick={addGame} className="add-game-button">Oyun əlavə et</button>
      <ul className="game-list">
        {games.map((game, index) => (
          <li 
          key={index} 
          className="game-list-item"
          style={{
            display:"flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
  
          }}>
            {game.name} - ${game.price}
            <button 
            onClick={() => deleteGame(index)} 
            className="delete-game-button"
            style={{
                backgroundColor: "red",
                color: "white"
            }}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
