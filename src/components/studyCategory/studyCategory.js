import React, {Component} from 'react';
import {Col, Container, Row} from "mdbreact";
import "./studyCategory.scss"
import {NavLink} from "react-router-dom";

class StudyCategory extends Component {
    render() { //class 형태의 Component에 필수로 있어야하는 함수S_내부에서 JSX 리턴
        return (
            <Container className="StudyCatogory">

                <div className="title">어떤 주제로 스터디해볼까요?</div>
                <div className="list-title">스터디 카테고리 리스트</div>

                <Row className="category-list">

                    <Col sm="4">
                        <NavLink exact to="/study/free" className="Category-card">
                            <div className=" Rectangle-20">
                                <div className="layer-free"> 자유주제</div>
                            </div>
                        </NavLink>
                    </Col>

                    <Col sm="4">
                        <NavLink exact to="/study/travel" className="Category-card">
                            <div>
                                <img src={require('./img/img-card-culture.png')}
                                     srcSet={`
                         ${require('./img/img-card-culture.png')} 300w,
                         ${require('./img/img-card-culture@2x.png')} 768w,
                         ${require('./img/img-card-culture@3x.png')} 1280w`}
                                     className="img_Card_background"  alt=""></img>

                            </div>

                            <div className="Category-title">
                                <img src={require('./img/category-culture.png')}
                                     srcSet={`
                         ${require('./img/category-culture.png')} 300w,
                         ${require('./img/category-culture@2x.png')} 768w,
                         ${require('./img/category-culture@3x.png')} 1280w`}
                                     className="Category-title-big"  alt=""></img>
                                <div className="Category-title-small layer"> 여행</div>
                            </div>
                        </NavLink>
                    </Col>

                    <Col sm="4">

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default StudyCategory;