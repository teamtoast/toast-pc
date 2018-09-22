import React, {Component} from 'react';
import "./studyCategory.scss"
import {NavLink} from "react-router-dom";
import Api from '../../api'

const StudyCategories = [
    {
        categoryID: 1,
        categoryLevel1: '자유주제',
        categoryLevel2: '자유주제'
    }, {
        categoryID: 2,
        categoryLevel1: '문화',
        categoryLevel2: '여행'
    }, {
        categoryID: 3,
        categoryLevel1: '생활',
        categoryLevel2: '연애'
    }, {
        categoryID: 4,
        categoryLevel1: '세계',
        categoryLevel2: '난민'
    }, {
        categoryID: 5,
        categoryLevel1: '생활',
        categoryLevel2: '폭염'
    }, {
        categoryID: 6,
        categoryLevel1: '사회',
        categoryLevel2: '취업'
    }
];

function GetStudyCategories(props) {
    let StudyCategoryList = props.categories.map((StudyCategory, i) =>

        <li key={i}>
            <NavLink exact to={{pathname: '/study/' + StudyCategory.id}}>
                <div className="category-card">
                    <div className="category-title">{StudyCategory.name}</div>
                </div>
            </NavLink>
        </li>
    );

    return (
        <ul className="category-list">{StudyCategoryList}</ul>
    );
}


class StudyCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        //API: [GET] 카테고리 리스트
        var that = this;
        Api.get('/categories').then(function(res) {
            let categories = [];
            res.data.forEach(element => {
                categories.push(element);
            });
            that.setState({
                categories: categories
            })
        });
    }

    render() { //class 형태의 Component에 필수로 있어야하는 함수S_내부에서 JSX 리턴
        return (
            <div className="Container StudyCatogory">

                <div className="title">어떤 주제로 스터디해볼까요?</div>
                <div className="list-title">스터디 카테고리 리스트</div>

                <GetStudyCategories categories={this.state.categories}/>
            </div>
        );
    }
}

export default StudyCategory;