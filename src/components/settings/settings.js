import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./settings.css";

const Settings = ({ setShowSettings }) => {
  const dispatch = useDispatch();
  const { orangeStatusMins, redStatusMins } = useSelector((state) => state.appState);

  const [orangeInput, setOrangeInput] = useState(orangeStatusMins);
  const [redInput, setRedInput] = useState(redStatusMins);

  const handleChange = (setter) => (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setter(value);
    }
  };

  const applySettings = () => {
    dispatch({ type: "appState/setOrangeStatusMins", payload: orangeInput });
    dispatch({ type: "appState/setRedStatusMins", payload: redInput });
    setShowSettings(false);
  };

  return (
    <div className="settings-popup-container">
      <div className="settings-header">
        <h1 className="settings-title">Configurações</h1>
        <div className="close-wrapper" onClick={() => setShowSettings(false)}>
          <div className="close-arrow">
            <div className="close-line" />
            <div className="close-line" />
          </div>
        </div>
      </div>

      <div className="settings-container">
        <label className="setting-label">Indicadores de status:</label>

        <div className="settings-description-block">
          <p className="settings-description">
            Configure os limites (em minutos) para alertas de sensores:
          </p>
          <ul className="settings-hint-list">
            <li><div className="green-status" /> <strong>Verde</strong>: sensor com dado recente.</li>
            <li><div className="orange-status" /> <strong>Laranja</strong>: sem atualização por mais de X minutos.</li>
            <li><div className="red-status" /> <strong>Vermelho</strong>: sem atualização por mais de Y minutos.</li>
          </ul>
        </div>

        <div className="status-options-container">
          <StatusInput
            label="Laranja após (min)"
            colorClass="orange-status"
            value={orangeInput}
            onChange={handleChange(setOrangeInput)}
          />
          <StatusInput
            label="Vermelho após (min)"
            colorClass="red-status"
            value={redInput}
            onChange={handleChange(setRedInput)}
          />
        </div>
      </div>

      <div className="settings-footer">
        <button className="settings-submit-button" onClick={applySettings}>
          Aplicar
        </button>
      </div>
    </div>
  );
};

const StatusInput = ({ label, colorClass, value, onChange }) => (
  <div className="status-option">
    <div className={colorClass} />
    <input
      className="status-input no-spin"
      type="number"
      min="0"
      value={value}
      onChange={onChange}
    />
    <label className="status-mins-label">{label}</label>
  </div>
);

export default Settings;
