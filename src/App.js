import React, { useState } from "react";
import "./App.css";

function App() {
    const [activeTab, setActiveTab] = useState("fluent");
    const [rpm, setRpm] = useState("");
    const [velocityX, setVelocityX] = useState("");
    const [velocityY, setVelocityY] = useState("");
    const [velocityZ, setVelocityZ] = useState("");

    return (
        <div className="container">
            <h1>ANSYS Simulation</h1>

            {/* Toggle Tabs */}
            <div className="tabs">
                <button
                    className={activeTab === "fluent" ? "active" : ""}
                    onClick={() => setActiveTab("fluent")}
                >
                    Fluent Simulation
                </button>
                <button
                    className={activeTab === "maxwell" ? "active" : ""}
                    onClick={() => setActiveTab("maxwell")}
                >
                    Maxwell Simulation
                </button>
            </div>

            {/* Simulation Sections */}
            {activeTab === "fluent" && (
                <div className="section">
                    <h2>Fluent Parameters</h2>
                    <div className="parameters">
                        <div className="parameter-box">
                            <h3>RPM</h3>
                            <input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} />
                        </div>
                        <div className="parameter-box">
                            <h3>Translational Velocity</h3>
                            <div className="velocity-inputs">
                                <label>X:</label>
                                <input type="number" value={velocityX} onChange={(e) => setVelocityX(e.target.value)} />
                                <label>Y:</label>
                                <input type="number" value={velocityY} onChange={(e) => setVelocityY(e.target.value)} />
                                <label>Z:</label>
                                <input type="number" value={velocityZ} onChange={(e) => setVelocityZ(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "maxwell" && (
                <div className="section">
                    <h2>Maxwell Parameters</h2>
                    <div className="parameters">
                        <div className="parameter-box">
                            <h3>RPM</h3>
                            <input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} />
                        </div>
                        <div className="parameter-box">
                            <h3>Translational Velocity</h3>
                            <div className="velocity-inputs">
                                <label>X:</label>
                                <input type="number" value={velocityX} onChange={(e) => setVelocityX(e.target.value)} />
                                <label>Y:</label>
                                <input type="number" value={velocityY} onChange={(e) => setVelocityY(e.target.value)} />
                                <label>Z:</label>
                                <input type="number" value={velocityZ} onChange={(e) => setVelocityZ(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Run Simulation Button */}
            <button className="run-button">Run Simulation</button>
        </div>
    );
}

export default App;
