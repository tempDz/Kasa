import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import FicheLogement from './pages/Fiche Logement/FicheLogement';
import Error404 from './pages/Error 404/Error404';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  body {
    min-width: 375px;
    margin: auto;
    overflow-y: scroll;
  }
`;

// Fonction principale (composant racine) de l'application
function App() {
  return (
    <>
      {/* Application du style global */}
      <GlobalStyle />
      {/* Configuration du routeur */}
      <Router>
        {/* Affichage de l'en-tête (Header) */}
        <Header />
        {/* Définition des routes */}
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<Home />} />
          {/* Route pour la page "À propos" */}
          <Route path="/about" element={<About />} />
          {/* Route pour la page "Fiche Logement" */}
          <Route path="/fiche-logement/:id" element={<FicheLogement />} />
          {/* Route pour la page d'erreur 404 */}
          <Route path="/404" element={<Error404 />} />
          {/* Route pour gérer les erreurs 404 - Page non trouvée */}
          <Route path="*" element={<Error404 />} />
        </Routes>
        {/* Affichage du pied de page (Footer) */}
        <Footer />
      </Router>
    </>
  );
}
export default App;
