import React from 'react';

function Right1({selected1}) {
    switch (selected1) {
        case 0:
          return <div>Content for 1Button 1</div>;
        case 1:
          return <div>Content for 2Button 2</div>;
        case 2:
          return <div>Content for 3Button 3</div>;
        default:
          return null;
      }
}

export default Right1;