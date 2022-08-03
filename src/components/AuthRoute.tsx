// 判断 token 是否存在 不存在重定向到登陆路由
// 高阶组件 把一个组件当作另一个组件的参数传入，通过判断返回新的组件

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export { AuthRoute };
