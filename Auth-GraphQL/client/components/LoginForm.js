import React, { Component } from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import AuthForm from "./AuthForm";
import { login } from "../mutation";
import { getCurrentUser } from "../queries";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: []
		};
	}

	handleLogin({ email, password }) {
		this.props
			.mutate({
				variables: {
					email,
					password
				},
				refetchQueries: [{ query: getCurrentUser }]
			})
			.catch(res => {
				const errors = res.graphQLErrors.map(err => err.message);
				this.setState({ errors });
			});
	}

	componentWillUpdate(nextProps) {
		// console.log(this.props, nextProps);
		if (!this.props.data.me && nextProps.data.me) {
			//redirect to dashboard
			hashHistory.push("/dashboard");
		}
	}

	render() {
		return (
			<div>
				<h3>Login</h3>
				<AuthForm
					handleAuth={this.handleLogin.bind(this)}
					errors={this.state.errors}
				/>
			</div>
		);
	}
}

export default graphql(getCurrentUser)(graphql(login)(LoginForm));
