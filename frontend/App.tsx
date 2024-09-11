import React from "react";
import ConnectMetamask from "./src/ConnectMetamask";
import { View } from "react-native";

// const sdk = new MetaMaskSDK({ dappMetadata });

export default function App() {
	return (
		<View>
			<ConnectMetamask/>
		</View>
	)
}