import gql from "graphql-tag";

export const getCurrentUser = gql`
	{
		me {
			id
			email
		}
	}
`;
