import React, { Component } from "react";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import App from "./App";

class Index extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App} />
			</Router>
		);
	}
}

export default Index;
