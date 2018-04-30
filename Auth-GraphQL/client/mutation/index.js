import gql from "graphql-tag";

export const logout = gql`
	mutation {
		logout {
			id
			email
		}
	}
`;

export const login = gql`
	mutation Login($email: String, $password: String) {
		login(email: $email, password: $password) {
			id
			email
		}
	}
`;

export const signup = gql`
	mutation Signup($email: String, $password: String) {
		signup(email: $email, password: $password) {
			id
			email
		}
	}
`;
