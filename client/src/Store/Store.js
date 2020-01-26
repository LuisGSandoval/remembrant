import React, { useReducer } from 'react';
import { reducer } from './reducer';
import { initialState } from './initialState';

const CTX = React.createContext();

export { CTX };

export default function Store(props) {
  const stateHook = useReducer(reducer, initialState);
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
