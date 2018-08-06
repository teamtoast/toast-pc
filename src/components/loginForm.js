import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';

class LoginForm extends React.Component  {
    state = {
        userID: '',
        userPassword: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            userID: '',
            userPassword: ''
        })
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col sm="12">
                        <form onSubmit={this.handleSubmit}>
                            <p className="h5 text-center mb-4">로그인</p>
                            <div className="grey-text">
                                <Input label="Type your ID" icon="envelope" group type="email" validate error="wrong" success="right"
                                       value={this.state.userID}
                                       onChange={this.handleChange}
                                       name="userID"/>

                                <Input label="Type your Password" icon="lock" group type="password" validate
                                       value={this.state.userPassword}
                                       onChange={this.handleChange}
                                       name="userPassword"/>
                            </div>
                            <div className="text-center">
                                <Button type="submit">확인</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default LoginForm