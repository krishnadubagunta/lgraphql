import React, { Component } from "react";

class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.handleAuth(this.state);
	}
	render() {
		return (
			<div className="row">
				<form className="col s4" onSubmit={this.handleSubmit.bind(this)}>
					<div className="input_field">
						<label>Email</label>
						<input
							value={this.state.email}
							onChange={({ target }) => this.setState({ email: target.value })}
						/>
					</div>
					<div className="input_field">
						<label>Password</label>
						<input
							value={this.state.password}
							type="password"
							onChange={({ target }) =>
								this.setState({ password: target.value })
							}
						/>
						{this.props.errors.map(error => (
							<div key={error} className="alert alert-danger alert-dismiss">
								{error}
							</div>
						))}
						<button className="btn">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}

export default AuthForm;
