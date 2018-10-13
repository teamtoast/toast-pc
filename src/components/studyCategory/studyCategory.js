import React, {Component} from 'react';
import "./studyCategory.scss"
import {NavLink} from "react-router-dom";
import Api from '../../api'
import "../studyCategory/studyCategory.scss"

export function CategoryList(props) {
    let StudyCategoryList = props.categories.map((StudyCategory, i) =>

        <li key={i}>
            <NavLink exact to={{pathname: '/study/' + StudyCategory.categoryID}}>
                {/*style={*/}
                {/*(StudyCategory.parentName === '자유주제')? null*/}
                    {/*: { backgroundImage: "url(https://"+StudyCategory.categoryImage+")",*/}
                        {/*backgroundSize: 'contain'}*/}
            {/*}*/}
                <div className="category-card" >
                    <div
                        className={"category-title" + (StudyCategory.parentName === '자유주제' ? " category-title-free" : "")}>
                        {StudyCategory.categoryName}
                    </div>
                    {StudyCategory.parentName !== '자유주제' ?
                        <div className="category-title-parent">
                            <p>{StudyCategory.parentName}</p>
                        </div>
                        : <img src={require('./img/logo-card@3x.png')}
                               className="Logo-Card" alt=""/>
                    }
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
        Api.get('/categories').then(function (res) {
            let categories = [];
            res.data.forEach(element => {
                categories.push(element);
            });
            that.setState({
                categories: categories
            });
        });
    }

    render() { //class 형태의 Component에 필수로 있어야하는 함수S_내부에서 JSX 리턴
        return (
            <div className="Container StudyCatogory">

                <div className="title">어떤 주제로 스터디해볼까요?</div>
                <div className="list-title">스터디 카테고리 리스트</div>

                <CategoryList categories={this.state.categories}/>
            </div>
        );
    }
}

export default StudyCategory;