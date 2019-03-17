import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ToasterA from './src/ToasterA'
import ToasterB from './src/ToasterB'
import ToasterC from './src/ToasterC'
import ToasterD from './src/ToasterD'
import ToasterE from './src/ToasterE'

const TEST_MESSAGE =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export default class App extends React.Component {
	_onPress = idx => () => {
		switch (idx) {
			case 1:
				this._toasterA.show()
				break
			case 2:
				this._toasterB.show()
				break
			case 3:
				this._toasterC.show()
				break
			case 4:
				this._toasterD.show()
				break
			case 5:
				this._toasterE.show()
				break
		}
	}

	_onToastClick = () => {
		console.log('=== toast click')
	}

	render() {
		return (
			<View style={styles.container}>
				<ToasterA
					ref={node => (this._toasterA = node)}
					message={TEST_MESSAGE}
					click={this._onToastClick}
				/>

				<ToasterB
					ref={node => (this._toasterB = node)}
					message={TEST_MESSAGE}
					click={this._onToastClick}
				/>

				<ToasterC
					ref={node => (this._toasterC = node)}
					message={TEST_MESSAGE}
					click={this._onToastClick}
				/>

				<ToasterD
					ref={node => (this._toasterD = node)}
					message={TEST_MESSAGE}
					click={this._onToastClick}
				/>

				<ToasterE
					ref={node => (this._toasterE = node)}
					message={TEST_MESSAGE}
					click={this._onToastClick}
				/>

				<TouchableOpacity onPress={this._onPress(1)} style={{ marginBottom: 30 }}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Type #1</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._onPress(2)} style={{ marginBottom: 30 }}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Type #2</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._onPress(3)} style={{ marginBottom: 30 }}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Type #3</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._onPress(4)} style={{ marginBottom: 30 }}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Type #4</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._onPress(5)}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Type #5</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1E90FF',
		borderRadius: 8,
		width: 100,
		height: 40,
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
	},
})
