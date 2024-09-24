import React from 'react';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';

const ClientLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main> {/* Render children inside a main tag for semantic structure */}
      <Footer />
    </div>
  );
};

export default ClientLayout;
