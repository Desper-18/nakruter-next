import { useReducer, useEffect, useState } from 'react';

function indicatorReducer(state, action) {
  switch (action.type) {
    case 'toggle_isEnabled':
      return {
        ...state,
        isEnabled: !state.isEnabled,
        value: 0,
      };
    case 'calculate_value':
      return {
        ...state,
        value: state.isEnabled
          ? Number(((action.value * state.rate) / 100).toFixed(2))
          : 0,
      };
    default:
      throw new Error('Unknown action');
  }
}

function useIndicator(initialState) {
  const [state, dispatch] = useReducer(indicatorReducer, {
    value: 0,
    rate: initialState.rate,
    isEnabled: initialState.isEnabled,
  });

  const calculateValue = amount => {
    dispatch({ type: 'calculate_value', value: amount });
  };

  const toggleEnabled = () => {
    dispatch({ type: 'toggle_isEnabled' });
  };

  return { state, calculateValue, toggleEnabled };
}
export default useIndicator;
