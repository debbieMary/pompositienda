// components/ui/Tabs.jsx
import { useState } from "react";

const tabStyle = {
  padding: "10px 20px",
  marginRight: "5px",
  border: "none",
  backgroundColor: "var(--pomp-plomo)",
  color: "var(--pomp-plomo-xoscuro)",
  cursor: "pointer",
  borderRadius: "5px 5px 0 0",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: "var(--pomp-turquesa)",
  color: "var(--pomp-white)",
};

export default function CustomTabs({ tabs, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="container">
      {/* Navegación por pestañas */}
      <div className="tabs-container" style={{ marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button mt-2 ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            style={activeTab === tab.id ? activeTabStyle : tabStyle}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      <div className="tab-content">
        {tabs.map((tab) => (
          <div key={tab.id} style={{ display: activeTab === tab.id ? "block" : "none" }}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}