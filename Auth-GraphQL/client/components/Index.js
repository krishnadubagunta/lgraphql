import React, { Component } from "react";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import App from "./App";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Dashboard from "./Dashboard";
import requireAuth from "./requireAuth";

class Index extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<Route path="login" component={LoginForm} />
					<Route path="signup" component={SignUpForm} />
					<Route path="dashboard" component={requireAuth(Dashboard)} />
				</Route>
			</Router>
		);
	}
}

export default Index;
