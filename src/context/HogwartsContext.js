import React from 'react';

const HogwartsContext = React.createContext({
  updateInfo: (data, type) => null,
  setDisplayInfo: (data) => null,
  resetChanges: (data) => null,
  changed: false,
  skills: [],
  updateStats: () => null,
  stats: {}
})

export default HogwartsContext;