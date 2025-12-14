import React from "react";
import Plot from "react-plotly.js";

const Chart = ({ type, title, data, layoutProps }) => {
  let plotData = [];

  // -----------------------------
  // BAR CHART (CYBER NEON THEME)
  // -----------------------------
  if (type === "bar") {
    plotData = [
      {
        type: "bar",
        x: data.labels,
        y: data.values,
        marker: {
          color: data.color || "#00e5ff", // neon cyan default
          line: {
            color: "#00e5ff",
            width: 1.4,
          },
        },
      },
    ];
  }

  // -----------------------------
  // PIE CHART (NEON THEME)
  // -----------------------------
  if (type === "pie") {
    plotData = [
      {
        type: "pie",
        labels: data.labels,
        values: data.values,
        hole: data.hole || 0.4,
        marker: {
          colors:
            data.colors || ["#4caf50", "#9e9e9e", "#f44336"], // neon green, gray, red
        },
        textinfo: "label+percent",
        textfont: {
          color: "#e0f7fa",
          size: 14,
        },
      },
    ];
  }

  // -----------------------------
  // LAYOUT (DARK + NEON)
  // -----------------------------
  const layout = {
    title: {
      text: title,
      font: { color: "#00e5ff", size: 20 },
    },

    // Transparent background
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.04)",

    // Chart size
    width: layoutProps?.width || 700,
    height: layoutProps?.height || 400,

    margin: { t: 60, b: 40, l: 50, r: 30 },

    // Axis styling
    xaxis: {
      color: "#b2ebf2",
      gridcolor: "rgba(255,255,255,0.06)",
      zerolinecolor: "rgba(255,255,255,0.15)",
      tickfont: { color: "#e0f7fa" },
    },
    yaxis: {
      color: "#b2ebf2",
      gridcolor: "rgba(255,255,255,0.06)",
      zerolinecolor: "rgba(255,255,255,0.15)",
      tickfont: { color: "#e0f7fa" },
    },

    // Combine user layout
    ...layoutProps,
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      config={{
        displaylogo: false,
        responsive: true,
      }}
    />
  );
};

export default Chart;
