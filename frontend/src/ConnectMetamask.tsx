import { StyleSheet, View, Text, Pressable } from "react-native";

import {
  	WalletConnectModal,
  	useWalletConnectModal
} from "@walletconnect/modal-react-native";

import axios from 'axios';
import React, { useState } from "react";
window.React = React


const projectId = "488a7bddb58382d447a5337ae9fa1298";

const providerMetadata = {
	name: 'EXPO-BLOCKCHAIN',
	description: 'My Expo project implementing Blockchain',
	url: 'https://your-project-website.com/',
	icons: ['https://your-project-logo.com/'],
	redirect: {
		native: 'YOUR_APP_SCHEME://',
		universal: 'YOUR_APP_UNIVERSAL_LINK.com',
	},
};

export default function ConnectMetamask() {
	// Add in the useWalletConnectModal hook + props
	const { open, isConnected, address, provider } = useWalletConnectModal();
	const [signature, setSignature] = useState("");
	const [response, setResponse] = useState("");

	const connectWallet = async () => {
		try {
			open();
			console.log("Connect wallet successfully")
		} catch (err) {
			console.log("Connect failed")
			console.log(err)
		}
	}

	const disconnectWallet = async () => {
		try {
			provider?.disconnect();
			console.log("Disconnect successfully")
		} catch (err) {
			console.log("Disconnect failed")
			console.log(err)
		}
	}

	const handleConnectWallet = () => {
		if (isConnected) {
			disconnectWallet()
		} else {
			connectWallet()
		}
	};

	const signPersonal = async () => {
		const exampleMessage = "Helo this is example message";
		try {
			const from = address;
			const msg = "Helo this is example message";
			const sign = await provider?.request({
                method: "personal_sign",
                params: [msg, from],
            })
			if (sign?.length !== 0) {
				setSignature(sign);
			}
            console.log(sign);
		} catch (err) {
            console.log(err);
		}
	}

	const handleSignMesssage = async () => {
		if (!isConnected) {
		    return;
		} else {
            signPersonal();
		}
	}

	const handleSendAPI = async () => {
		const res = await axios.post('http://192.168.1.104:4001/helo')
			.then((res) => {
				setResponse(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	// Main UI Render
	return (
		<View>
			<Text style={styles.heading}>Demo Mobile</Text>

			<Pressable onPress={handleConnectWallet} style={styles.pressable}>
				<Text style={styles.text}>{isConnected ? 'Disconnect' : 'Connect'}</Text>
			</Pressable>
			<Text style={styles.text}>Address: {isConnected ? address : 'No Connected'}</Text>
			
            <Pressable onPress={handleSignMesssage} style={styles.pressable}>
                <Text style={styles.text}>Sign message</Text>
            </Pressable>
			<Text style={styles.text}>Signature: {signature}</Text>

			<Pressable onPress={handleSendAPI} style={styles.pressable}>
                <Text style={styles.text}>Send API Test</Text>
            </Pressable>
			<Text style={styles.text}>Response from server: {response}</Text>

			<WalletConnectModal
				projectId={projectId}
				providerMetadata={providerMetadata}
				explorerRecommendedWalletIds={[
					'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // metamask
					'4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // TrustWallet
					'8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4', // Binance
				]}
				explorerExcludedWalletIds={'ALL'}
			/>
		</View>
	);
}

// https://explorer.walletconnect.com/?type=wallet


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	heading: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 16,
		marginTop: 20,
		borderWidth: 2,
	},
	pressableMargin: {
		marginTop: 16,
	},
    pressable: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'cyan',
    },
    text: {
        margin: 10,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
});