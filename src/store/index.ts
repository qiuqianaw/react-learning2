import React from "react";
import LoginStore from "./login.Store";

export const rootStore = {
  loginStore: new LoginStore(),
};

// class RootStore {
//   constructor() {
//     this.loginStore = new LoginStore();
//   }
// }

// const rootStore = new RootStore();
// const context = React.createContext(rootStore);

// const useStore = () => React.useContext(context);

// export { useStore };
const storeContext = React.createContext(rootStore);

const useStore = () => React.useContext(storeContext);

export default useStore;
