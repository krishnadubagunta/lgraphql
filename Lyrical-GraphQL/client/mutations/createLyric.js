import gql from "graphql-tag";

export default gql`
	mutation AddLyricToSong($content: String!, $id: ID!) {
		addLyricToSong(content: $content, songId: $id) {
			id
			lyrics {
				id
				content
				likes
			}
		}
	}
`;
