import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input
          type="password"
          name="password"
          id={"password"}
          autoComplete="current-password"
          placeholder="密码"
        />
      </Form.Item>
      <LongButton htmlType="submit" type="primary">
        登录
      </LongButton>
    </Form>
  );
};
