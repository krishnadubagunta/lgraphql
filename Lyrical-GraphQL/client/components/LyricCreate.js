import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import gql from "graphql-tag";
import createLyric from "../mutations/createLyric";
import FetchSong from "../queries/fetchSong";

class LyricCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ""
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.mutate({
				variables: {
					id: this.props.id,
					content: this.state.content
				}
			})
			.then(() => this.setState({ content: "" }));
	}

	render() {
		const { content } = this.state;
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label>Lyric Title : </label>
					<input
						name="title"
						value={content}
						onChange={e => this.setState({ content: e.target.value })}
					/>
				</form>
			</div>
		);
	}
}

export default graphql(createLyric)(LyricCreate);
