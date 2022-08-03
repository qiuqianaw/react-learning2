import { Card, Form, Input, Checkbox, Button, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";

import useStore from "@/store";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginStore } = useStore();
  const navigate = useNavigate();

  async function onFinish(values: { mobile: string; code: string }) {
    // values 放置所有标单项中用户输入的内容
    console.log(values);
    // todo: 登陆
    try {
      await loginStore.getToken({
        mobile: values.mobile,
        code: values.code,
      });
      // 跳转首页
      navigate("/", { replace: true });
      // 提示
      message.success("登陆成功");
    } catch (error: any) {
      message.error(error.response?.data?.message || "登录失败");
    }
  }
  const onFinishFailed = (errorInfo: Object) => {
    console.log("errorInfo => ", errorInfo);
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form
          validateTrigger={["onBlur", "onChange"]}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "please input correct phone number!",
                validateTrigger: "onBlur",
              },
              {
                required: true,
                message: "please input your phone number!",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                len: 6,
                message: "please input 6 code",
                validateTrigger: "onBlur",
              },
              {
                required: true,
                message: "please input code!",
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
