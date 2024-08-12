import React, { createContext, useState, useContext } from 'react';

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);

  return (
    <BannerContext.Provider value={{ visible, setVisible }}>
      {children}
    </BannerContext.Provider>
  );
};
export const useBanner = () => useContext(BannerContext);
