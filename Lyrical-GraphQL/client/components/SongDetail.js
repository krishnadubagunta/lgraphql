import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link, hashHistory } from "react-router";

import FetchSong from "../queries/fetchSong";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ""
		};
	}

	renderComponent(song) {
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>{song.title}</h3>
				<LyricList lyrics={song.lyrics} />
				<LyricCreate id={song.id} />
			</div>
		);
	}

	render() {
		const { data } = this.props;
		return (
			<div>{data.loading ? <div /> : this.renderComponent(data.song)}</div>
		);
	}
}

export default graphql(FetchSong, {
	options: props => {
		return { variables: { id: props.params.id } };
	}
})(SongDetail);
