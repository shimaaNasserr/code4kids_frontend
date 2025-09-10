import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";

export const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(categories);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const categoryImages = {
    "Programming for Kids": "/images/pfk.png",
    "Web Design": "/images/web-design.png",
    "Artificial Intelligence": "/images/ai.png",
    "Games and Programming": "/images/games.png",
    Arduino: "/images/ard.png",
    DataBases: "/images/database.png",
    "Game Art": "/images/game-art.png",
    Robotics: "/images/robotics.png",
    "Mobile Apps": "/images/mobile-apps.png",
  };

  return (
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <h3 className="mb-4 text-center">Courses Categories</h3>
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4 mb-3" key={category.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  categoryImages[category.name] ||
                  "https://via.placeholder.com/400x200"
                }
                className="card-img-top"
                alt={category.name}
              />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p
                  className="card-text"
                  style={{ color: "#00465F", fontWeight: "500" }}
                >
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
