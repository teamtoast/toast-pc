import React from 'react';
import {Button, Col, Container, Input, Row} from 'mdbreact';

class RegisterForm extends React.Component  {
    state = {
        userID: '',
        userPassword: '',
        userNickname: ''
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
            userPassword: '',
            userNickname: ''
        })
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col sm="12">
                        <form onSubmit={this.handleSubmit}>
                            <p className="h5 text-center mb-4">회원가입</p>
                            <div className="grey-text">
                                <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"
                                       value={this.state.userID}
                                       onChange={this.handleChange}
                                       name="userID"/>
                                <Input label="Your password" icon="lock" group type="password" validate
                                       value={this.state.userPassword}
                                       onChange={this.handleChange}
                                       name="userPassword"/>
                                <Input label="Confirm your password" icon="exclamation-triangle" group type="text" validate error="wrong" success="right"/>
                                <Input label="Your Nickname" icon="user" group type="text" validate error="wrong" success="right"
                                       value={this.state.userNickname}
                                       onChange={this.handleChange}
                                       name="userNickname"/>
                            </div>
                            <div className="text-center">
                                <Button type="submit" color="primary">등록</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default RegisterForm