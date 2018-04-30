import React, { Component } from "react";
import { hashHistory } from "react-router";
import { graphql } from "react-apollo";

import { getCurrentUser } from "../queries";

export default WrappedComponent => {
	class RequireAuth extends Component {
		componentWillUpdate(nextProps) {
			if (!nextProps.data.loading && !nextProps.data.me) {
				hashHistory.push("/login");
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	return graphql(getCurrentUser)(RequireAuth);
};
