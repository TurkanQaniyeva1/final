import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    fetch(`https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("Error fetching item:", error));
  }, [id]);

  if (!item) {
    return <div className="loading">Loading...</div>;
  }

  const imageUrl = item.image ? item.image : 'https://via.placeholder.com/300'; 
  const mediaUrl = item.media ? item.media : ''; 

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="image-section">
          <img src={imageUrl} alt={item.name} className="detail-image" />
        </div>
        <div className="content-section">
          <img src={imageUrl} alt={item.name} className="detail-image" />
          <h1 className="detail-title">{item.name}</h1>
          <p className="detail-category">Category: {item.category}</p>
          <p className="detail-price">
            Price: {isNaN(item.price) ? "Free" : `$${item.price.toFixed(2)}`}
          </p>
          <p className="detail-description">{item.description}</p>
          {mediaUrl && (
            <div className="detail-media">
              <h3>Media</h3>
              <iframe
                src={mediaUrl}
                title={item.name}
                className="detail-video"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
