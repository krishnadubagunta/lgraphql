import React, { Component } from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import { signup, login } from "../mutation";
import { getCurrentUser } from "../queries";
import AuthForm from "./AuthForm";

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: []
		};
	}

	handleSignup({ email, password }) {
		this.props
			.mutate({
				variables: { email, password },
				refetchQueries: [{ query: getCurrentUser }]
			})
			.then(() => {
				this.setState({ errors: [] });
			})
			.catch(res => {
				const errors = res.graphQLErrors.map(error => error.message);
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
				<h3>Sign Up</h3>
				<AuthForm
					handleAuth={this.handleSignup.bind(this)}
					errors={this.state.errors}
				/>
			</div>
		);
	}
}

export default graphql(getCurrentUser)(graphql(signup)(SignupForm));
