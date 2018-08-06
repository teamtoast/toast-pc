// import React, { Component } from 'react'
// import LoginForm from "../components/loginForm";
// import * as userActions from '../store/modules/user';
// import {connect} from "react-redux";
//
// class LoginContainer extends Component {
//     handleLogin = () => {
//         this.props.login();
//     }
//
//     render() {
//         const { handleLogin } = this;
//         const { userState } = this.props;
//         return (
//             <LoginForm
//                 handleSubmit = {handleLogin}
//             />
//         );
//     }
// }
//
//
// const mapStateToProps = (state) => ({
//     userState: state.user.userState
// })
//
// const mapDispatchToProps = (dispatch) => ({
//     login: () => dispatch(userActions.login())
// })
//
// export default connect(mapStateToProps(),mapDispatchToProps())(LoginContainer);