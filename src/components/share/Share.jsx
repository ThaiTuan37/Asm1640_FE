import "./share.css";
import React, { useState } from 'react';
import contributionApi from '../../api/contributionApi';

export default function Share({ eventId, handleToggleReloadContribution }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (isChecked) {
      const handler = async () => {
        const bodyFormData = new FormData();

        bodyFormData.append('content', content);
        bodyFormData.append('event', eventId);
        bodyFormData.append('documents', selectedFile);

        const response = await contributionApi.create(bodyFormData);
        if (response) {
          handleToggleReloadContribution();
          setShowPopup(false);
        }
      };

      handler();
    } else {
      alert('Please accept the rules before posting.');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOkClick = () => {
    setShowPopup(false);
    if (isChecked) {
      handleUpload();
    } else {
      alert('Please accept the rules before posting.');
    }
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            placeholder="Content"
            className="shareInput"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOption">
            <label htmlFor="fileInput" className="fileInputWrapper">
              <input type="file" id="fileInput" onChange={handleFileChange} />
            </label>
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
          </div>
          <button onClick={() => setShowPopup(true)} className="shareButton">Post</button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popupContent">
            <h2>Accept Rules</h2>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              I accept the rules
            </label>
            <div className="popupButtons">
              <button onClick={handleOkClick}>Ok</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}