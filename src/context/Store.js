import React, { createContext, useEffect, useState } from 'react';
export const VendersContext = createContext([])

function VenderContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLang, setIsLang] = useState(localStorage.getItem('langChange'));
  const toggle = () => setIsOpen(!isOpen);
  function LogOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  const chnageLang = () => {
    if (!localStorage.getItem('langChange')) {
      setIsLang('en')
      return localStorage.setItem('langChange', 'en')
    } else {
      return localStorage.setItem('langChange', isLang)
    }
  }

  useEffect(() => {

    chnageLang()

  }, [isLang])


  return (
    <>
      <VendersContext.Provider value={{ 
        isLang, setIsLang, isOpen, setIsOpen, toggle, LogOut
      }}>
        {children}
      </VendersContext.Provider>
    </>
  )
}

export default VenderContext