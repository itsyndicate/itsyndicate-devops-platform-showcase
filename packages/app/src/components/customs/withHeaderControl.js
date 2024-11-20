import React from 'react';
import { useUIContext } from './UIContext'; // Adjust the import path as necessary
import { withStyles } from '@material-ui/core/styles';

// Higher-order component to apply conditional styles
const withHeaderControl = (Component) => {
  const StyledComponent = withStyles({
    root: {
      '& .MuiContainer-root': {
        display: 'none', // This targets the container class; adjust as needed
      },
    },
  })(Component);

  return (props) => {
    const { hideHeader } = useUIContext();

    return hideHeader ? <StyledComponent {...props} /> : <Component {...props} />;
  };
};

export default withHeaderControl;
