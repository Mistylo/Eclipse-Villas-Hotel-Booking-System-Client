import React, { useState, useEffect } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState('');

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== '') {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType('');
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            className="form-control"
            value={newRoom.roomType}  
            onChange={(e) => {
              if (e.target.value === 'Add New') {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e); 
                setShowNewRoomTypeInput(false);
              }
            }}
          >
            <option value={''}>Select Room Type</option>
            <option value={'Add New'}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group mt-2">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new room type"
                onChange={handleNewRoomTypeInputChange}
              />
              <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
