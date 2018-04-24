import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import gql from "graphql-tag";
import addSong from "../mutations/addSong";
import fetchSongs from "../queries/fetchSongs";

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
				},
				refetchQueries: [{ query: fetchSongs }]
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

export default graphql(addSong)(SongCreate);
