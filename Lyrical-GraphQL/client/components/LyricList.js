import React, { Component } from "react";
import { graphql } from "react-apollo";
import LikeLyric from "../mutations/LikeLyric";

class LyricList extends Component {
	handleLike(id, likes) {
		this.props.mutate({
			variables: { id },
			optimisticResponse: {
				__typename: "Mutation",
				likeLyric: {
					id,
					__typename: "LyricType",
					likes: likes + 1
				}
			}
		});
	}

	render() {
		const { lyrics } = this.props;
		return (
			<ul className="collection">
				{lyrics.map(lyric => {
					return (
						<li key={lyric.id} className="collection-item">
							{lyric.content}
							<div className="vote-box">
								<i
									className="material-icons show-pointer"
									onClick={() => this.handleLike(lyric.id, lyric.likes)}
								>
									thumb_up
								</i>
								{lyric.likes}
							</div>
						</li>
					);
				})}
			</ul>
		);
	}
}

export default graphql(LikeLyric)(LyricList);
