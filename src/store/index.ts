import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import ChannelStore from "./channel.Store";

export const rootStore = {
  loginStore: new LoginStore(),
  userStore: new UserStore(),
  channelStore: new ChannelStore(),
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
