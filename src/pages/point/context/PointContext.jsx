import React, { createContext, useContext } from 'react';

const PointDataContext = createContext();

const usePointData = () => useContext(PointDataContext);

const PointDataProvider = ({ memberNo, pointNo, children }) => {
  return (
      <PointDataContext.Provider value={ { memberNo, pointNo } }>
        { children }
      </PointDataContext.Provider>
  );
};

export { usePointData, PointDataProvider };
