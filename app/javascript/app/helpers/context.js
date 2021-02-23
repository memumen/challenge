import React, { useReducer, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const StateContext = createContext();
const DispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'addFile': {
      const currentFiles = [...state.files];
      currentFiles.push(action.file);
      return { files: currentFiles };
    }
    case 'removeFile': {
      const { file: { id } } = action;
      return { files: state.files.filter(item => +item.id !== +id ) };
    }
    case 'successMessage': {
      toast.success(action.message);
      return state;
    }
    case 'updateFiles': {
      return { files: action.files };
    }
    case 'errorMessage': {
      toast.error(action.message);
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, { files: [] });
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
};

const useState = () => {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useState must be used within a Provider');
  }
  return context;
};

const useDispatch = () => {
  const context = useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useDispatch must be used within a Provider');
  }
  return context;
}

export { Provider, useState, useDispatch };
