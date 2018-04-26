import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import fetchSongs from "../queries/fetchSongs";
import DeleteSong from "../mutations/deleteSong";

class SongList extends Component {
	onSongDelete(id) {
		this.props
			.mutate({
				variables: {
					id
				}
			})
			.then(() => this.props.data.refetch());
	}

	handleClick(id) {
		hashHistory.push(`songs/${id}`);
	}

	renderSongs() {
		return this.props.data.songs.map((song, i) => {
			return (
				<li
					key={song.id}
					className="collection-item show-pointer"
					onClick={() => {
						this.handleClick(song.id);
					}}
				>
					{song.title}
					<i
						className="material-icons right show-pointer"
						onClick={() => {
							this.onSongDelete(song.id);
						}}
					>
						delete
					</i>
				</li>
			);
		});
	}

	render() {
		if (this.props.data.loading) {
			return <div>Loading ... </div>;
		}
		return (
			<div>
				<ul className="collection">{this.renderSongs()}</ul>
				<Link to="songs/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

export default graphql(DeleteSong)(graphql(fetchSongs)(SongList));
