import React from "react";
import { Main } from "./styled";
import ParticlesAuth from "./ParticlesAuth";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "assets/images/leeon-logo.png";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
const Login = (props) => {
  const [form] = Form.useForm();
  const { onLogin } = useDispatch().auth;
  const onSave = () => {
    form.submit();
  };

  const onHandleSubmit = (values) => {
    const { userName, password } = values;
    if (userName && userName.length && password && password.length) {
      onLogin({ userName, password }).then((s) => {
        window.location.href = "/admin/home";
      });
    }
  };

  const onKeyDown = (e) => {
    if (e.nativeEvent.code === "Enter") {
      form.submit();
    }
  };
  return (
    <Main>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="logo">
                  <div>
                    <Link to="/admin/home" className="d-inline-block auth-logo">
                      <img src={logo} alt="" width={150} height={75} />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col className="content-form">
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to Web MNP.
                      </p>
                    </div>
                    <Form
                      layout="vertical"
                      form={form}
                      className="form-custom"
                      onFinish={onHandleSubmit}
                    >
                      <Form.Item label="Tên tài khoản" name="userName">
                        <Input
                          placeholder="Enter username"
                          onKeyDown={onKeyDown}
                        ></Input>
                      </Form.Item>
                      <Form.Item label="Tên tài khoản" name="password">
                        <Input.Password
                          placeholder="Enter password"
                          type="password"
                          onKeyDown={onKeyDown}
                        ></Input.Password>
                      </Form.Item>
                      <Button className="button" onClick={onSave}>
                        Đăng nhập
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </Main>
  );
};

export default Login;
