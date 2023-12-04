import React from 'react';

function Rcomponent({ onChildClick }) {

  const handleButtonClick1 = () => {
    onChildClick("prev");
  };

  const handleButtonClick2 = () => {
    onChildClick("cur");
  };

  const handleButtonClick3 = () => {
    onChildClick("next");
  };

  return (
    <div>
	  { /* Cool comment */ }
      <button onClick={() => handleButtonClick1()}> Prev </button>
      <button onClick={() => handleButtonClick2()}> Refresh </button>
      <button onClick={() => handleButtonClick3()}> Next </button>
    </div>
  );
}

export default Rcomponent;
