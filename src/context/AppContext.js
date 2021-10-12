import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  favorite: [],
  update: false,
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      const newFav = [...state.favorite, action.payload];
      return {
        ...state,
        favorite: newFav,
      };

    case "DELETE_FAVORITE":
      const filterFav = state.favorite.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        favorite: filterFav,
      };

    case "UPDATE":
      return {
        ...state,
        update: !state.update,
      };
    default:
      throw new Error("unknown cases");
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
