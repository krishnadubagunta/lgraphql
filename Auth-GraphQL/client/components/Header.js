import React, { Component } from "react";
import { graphql } from "react-apollo";

import { getCurrentUser } from "../queries";

class Header extends Component {
	renderButtons(me) {
		if (!me) {
			return <div>Login</div>;
		}
		return <div>Logout</div>;
	}

	render() {
		const { loading, me } = this.props.data;
		console.log(loading, me);
		return <div>{loading ? <div /> : this.renderButtons(me)}</div>;
	}
}

export default graphql(getCurrentUser)(Header);
