import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import gql from "graphql-tag";

class SongCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ""
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.mutate({
				variables: {
					title: this.state.title
				}
			})
			.then(() => hashHistory.push("/"))
			.catch(() => {});
	}

	render() {
		const { title } = this.state;
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>Song Create</h3>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label>Song Title : </label>
					<input
						name="title"
						value={title}
						onChange={e => this.setState({ title: e.target.value })}
					/>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			id
			title
		}
	}
`;

export default graphql(mutation)(SongCreate);
