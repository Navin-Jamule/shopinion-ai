import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeProduct } from "../api";

const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setLoading(true);
    setProgress(1);

    try {
      setTimeout(() => setProgress(2), 600);
      setTimeout(() => setProgress(3), 1200);

      const result = await analyzeProduct(url);

      setProgress(4);
      setLoading(false);

      navigate(`/results/${result.asin}`, { state: { result } });
    } catch (err) {
      alert("Error analyzing product");
      setLoading(false);
      setProgress(0);
    }
  };

  const getProgressLabel = () => {
    switch (progress) {
      case 1: return "🚀 Starting...";
      case 2: return "🔎 Scraping reviews...";
      case 3: return "⚙️ Processing insights...";
      case 4: return "✅ Completed!";
      default: return "";
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins, sans-serif",
      color: "#f5f5f5",
      background:
        "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 30%, #2d0d5a 100%)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",

      // ❌ REMOVE padding (this was breaking full-screen background)
      // padding: "2rem",
    }}
  >

    {/* Full-screen background texture */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
        opacity: 0.08,
        pointerEvents: "none",
      }}
    />

    {/* Card */}
    <div
      style={{
        boxShadow: "0 0 10px 2px rgba(0, 255, 255, 0.6)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: "20px",

        // moved padding here instead
        padding: "3rem",

        maxWidth: "720px",
        width: "90%",  // better for responsiveness
        zIndex: 1,
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "2.8rem",
          marginBottom: "1rem",
          background: "linear-gradient(90deg, #00e5ff, #ffa726)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          fontWeight: "700",
          display: "inline-block",
        }}
      >
        🛍️ Shopinion AI
      </h1>

      <p style={{ fontSize: "1.2rem", color: "#dcdcdc", marginBottom: "2rem" }}>
        AI-powered insights from Amazon product reviews
      </p>

      {/* Input Row */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.amazon.in/..."
          style={{
            flex: 1,
            padding: "0.8rem",
            borderRadius: "12px",
            border: "none",
            background: "rgba(255,255,255,0.08)",
            color: "#f5f5f5",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <button
          onClick={handleAnalyze}
          style={{
            background: "linear-gradient(90deg, #00e5ff, #ffa726)",
            color: "white",
            padding: "0.8rem 1.5rem",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Run Analysis
        </button>
      </div>

      {/* Progress */}
      {loading && (
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              overflow: "hidden",
              height: "24px",
            }}
          >
            <div
              style={{
                width: `${progress * 25}%`,
                background:
                  progress === 4
                    ? "linear-gradient(90deg, #4caf50, #81c784)"
                    : "linear-gradient(90deg, #00e5ff, #ffa726)",
                height: "100%",
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <p
            style={{
              marginTop: "0.8rem",
              color: progress === 4 ? "#4caf50" : "#00e5ff",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            {getProgressLabel()}
          </p>
        </div>
      )}
    </div>
  </div>
);


};

export default Home;
