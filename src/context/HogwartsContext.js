import React from 'react';

const HogwartsContext = React.createContext({
  update: () => null,
  goHome: () => null
})

export default HogwartsContext;