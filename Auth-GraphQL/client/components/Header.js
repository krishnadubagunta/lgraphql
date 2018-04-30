import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import { getCurrentUser } from "../queries";
import { logout } from "../mutation";

class Header extends Component {
	onLogout() {
		this.props.mutate({
			refetchQueries: [{ query: getCurrentUser }]
		});
	}

	renderButtons(me) {
		if (!me) {
			return (
				<div>
					<li>
						<Link to="/signup">Sign up</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</div>
			);
		}
		return (
			<li>
				<a onClick={this.onLogout.bind(this)}>Logout</a>
			</li>
		);
	}

	render() {
		const { loading, me } = this.props.data;
		console.log(loading, me);
		return (
			<nav>
				<div className="nav-wrapper container">
					<Link className="brand-logo left" to="/">
						Home
					</Link>
					<ul className="right">
						{loading ? <div /> : this.renderButtons(me)}
					</ul>
				</div>
			</nav>
		);
	}
}

export default graphql(logout)(graphql(getCurrentUser)(Header));
