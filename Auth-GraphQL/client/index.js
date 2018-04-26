import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";

import Index from "./components/Index";

const networkInterface = createNetworkInterface({
	uri: "/graphql",
	opts: {
		credentials: "same-origin"
	}
});

const client = new ApolloClient({
	dataIdFromObject: o => o.id,
	networkInterface
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Index />
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector("#root"));
