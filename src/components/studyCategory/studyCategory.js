import React, {Component} from 'react';
import "./studyCategory.scss"
import {NavLink} from "react-router-dom";
import Api from '../../api'

const StudyCategories = [
    {
        categoryID: 1,
        categoryLevel1: 'free',
        categoryLevel2: 'free'
    }, {
        categoryID: 2,
        categoryLevel1: 'culture',
        categoryLevel2: 'travel'
    }, {
        categoryID: 3,
        categoryLevel1: 'life',
        categoryLevel2: 'love'
    }, {
        categoryID: 4,
        categoryLevel1: 'world',
        categoryLevel2: 'refugee'
    }, {
        categoryID: 5,
        categoryLevel1: 'life',
        categoryLevel2: 'Heat'
    }, {
        categoryID: 6,
        categoryLevel1: 'social',
        categoryLevel2: 'employment'
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