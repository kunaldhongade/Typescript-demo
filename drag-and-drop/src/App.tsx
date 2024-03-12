import React from 'react';
import './styles/__globals.css'
import Header from "./containers/Header";
import MainLayout from "./containers/MainLayout/MainLayout";

function App() {
  return (
    <>
      <Header/>
      <MainLayout/>
    </>
  );
}

export default App;
