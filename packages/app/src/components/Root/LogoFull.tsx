import React from 'react';
import MyCustomLogoFull from './full-prost.png';

const LogoFull = () => {
  return <img src={MyCustomLogoFull} style={{
    width: '150px',
    height: 'auto',
    marginInline: 'auto'
  }} />;
};

export default LogoFull;