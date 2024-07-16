import React, { createContext, useContext } from 'react';

const PointDataContext = createContext();

const usePointData = () => useContext(PointDataContext);

const PointDataProvider = ({ memberNo, children }) => {
  return (
    <PointDataContext.Provider value={ { memberNo } }>
      { children }
    </PointDataContext.Provider>
  );
};

export { usePointData, PointDataProvider };
