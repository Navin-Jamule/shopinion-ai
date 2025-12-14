import React from "react";
import { useLocation } from "react-router-dom";
import Chart from "../components/Chart";

const Results = () => {
  const { state } = useLocation();
  const {
    summary = [],
    reviews = [],
    asin = "N/A",
    total_reviews = 0,
    accuracy,
  } = state?.result || {};

  const positiveAspects = [...summary]
    .filter((s) => s.net_score > 0)
    .sort((a, b) => b.net_score - a.net_score)
    .slice(0, 5);

  const negativeAspects = [...summary]
    .filter((s) => s.net_score < 0)
    .sort((a, b) => a.net_score - b.net_score)
    .slice(0, 5);

  const positiveLabels = positiveAspects.map((s) => s.aspect);
  const positiveScores = positiveAspects.map((s) => s.net_score);

  const negativeLabels = negativeAspects.map((s) => s.aspect);
  const negativeScores = negativeAspects.map((s) => Math.abs(s.net_score));

  const positiveCount = summary.reduce((sum, s) => sum + (s.positive || 0), 0);
  const negativeCount = summary.reduce((sum, s) => sum + (s.negative || 0), 0);
  const neutralCount = Math.max(0, total_reviews - positiveCount - negativeCount);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        fontFamily: "Poppins, sans-serif",
        background: "#0b0b0b", // << Removed gradient - clean dark theme
        color: "#f5f5f5",
        padding: "3rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* TEXTURE OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />

      {/* CONTENT WRAPPER */}
      <div
        style={{
          boxShadow: "0 0 10px 2px rgba(0, 255, 255, 0.25)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: "20px",
          padding: "2.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
          zIndex: 1,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <h2
          style={{
            fontSize: "2.4rem",
            marginBottom: "1rem",
            background: "linear-gradient(90deg, #00e5ff, #ffa726)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          📊 Results for ASIN: {asin}
        </h2>

        <p style={{ textAlign: "center", color: "#dcdcdc", marginBottom: "2rem" }}>
          Total Reviews: {total_reviews} | Accuracy:{" "}
          {typeof accuracy === "number" ? `${accuracy.toFixed(2)}%` : "N/A"}
        </p>

        {/* Top 5 Aspect Lists */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* POSITIVE */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                background: "linear-gradient(90deg, #00e5ff, #ffa726)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.8rem",
                fontWeight: 600,
              }}
            >
              Top 5 Positive Aspects
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {positiveAspects.map((a, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{ color: "#00e5ff", fontWeight: 600 }}>{a.aspect}</span>
                  <span style={{ color: "#81c784" }}>
                    net: {a.net_score} • pos: {a.positive || 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* NEGATIVE */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                background: "linear-gradient(90deg, #00e5ff, #ffa726)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.8rem",
                fontWeight: 600,
              }}
            >
              Top 5 Negative Aspects
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {negativeAspects.map((a, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{ color: "#ffa726", fontWeight: 600 }}>{a.aspect}</span>
                  <span style={{ color: "#f44336" }}>
                    net: {a.net_score} • neg: {a.negative || 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <Chart
            type="bar"
            title="Positive Aspects"
            data={{ labels: positiveLabels, values: positiveScores, color: "#00e5ff" }}
            layoutProps={{ width: 420, height: 300 }}
          />
          <Chart
            type="bar"
            title="Negative Aspects"
            data={{ labels: negativeLabels, values: negativeScores, color: "#ff7043" }}
            layoutProps={{ width: 420, height: 300 }}
          />
        </div>

        <h3
          style={{
            background: "linear-gradient(90deg, #00e5ff, #ffa726)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Sentiment Breakdown
        </h3>

        <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
          <Chart
            type="pie"
            title="Sentiment Breakdown"
            data={{
              labels: ["Positive", "Neutral", "Negative"],
              values: [positiveCount, neutralCount, negativeCount],
              colors: ["#4caf50", "#9e9e9e", "#f44336"],
              hole: 0.4,
            }}
            layoutProps={{ width: 420, height: 420 }}
          />
        </div>

        {/* REVIEWS TABLE */}
        <h3
          style={{
            background: "linear-gradient(90deg, #00e5ff, #ffa726)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.8rem",
            fontWeight: 600,
          }}
        >
          Aspect-Level Reviews
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "0.5rem",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
            }}
          >
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.1)" }}>
                <th style={{ padding: "0.8rem", color: "#00e5ff", textAlign: "left" }}>
                  Review
                </th>
                <th style={{ padding: "0.8rem", color: "#00e5ff", textAlign: "left" }}>
                  Aspect
                </th>
                <th style={{ padding: "0.8rem", color: "#00e5ff", textAlign: "left" }}>
                  Sentiment
                </th>
                <th style={{ padding: "0.8rem", color: "#00e5ff", textAlign: "left" }}>
                  Confidence
                </th>
              </tr>
            </thead>

            <tbody>
              {reviews.slice(0, 20).map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <td style={{ padding: "0.8rem", color: "#eee" }}>{r.review}</td>
                  <td style={{ padding: "0.8rem", color: "#eee" }}>{r.aspect}</td>
                  <td style={{ padding: "0.8rem", color: "#eee" }}>{r.predicted_sentiment}</td>
                  <td style={{ padding: "0.8rem", color: "#eee" }}>
                    {typeof r.confidence === "number" ? r.confidence.toFixed(2) : "N/A"}
                  </td>
                </tr>
              ))}

              {reviews.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{ padding: "0.8rem", color: "#bbb", textAlign: "center" }}
                  >
                    No reviews available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Results;
