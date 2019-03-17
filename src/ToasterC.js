import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Dimensions,
	Animated,
} from 'react-native'

const { width } = Dimensions.get('window')

export default class ToasterC extends React.Component {
	constructor(props) {
		super(props)
		this.animatedValue = new Animated.Value(-100)
		this._timer = null
	}

	componentDidMount() {
		if (this._timer) {
			clearTimeout(this._timer)
		}
	}

	show() {
		if (this._timer) {
			clearTimeout(this._timer)
		}
		this._timer = setTimeout(this.hide, 2000)

		this.animatedValue.setValue(-100)
		Animated.timing(this.animatedValue, {
			toValue: 40,
			duration: 200,
		}).start()
	}

	hide = () => {
		if (this._timer) {
			clearTimeout(this._timer)
		}

		Animated.timing(this.animatedValue, {
			toValue: -100,
			duration: 200,
		}).start()
	}

	_onPress = () => {
		this.hide()
		this.props.click()
	}

	render() {
		return (
			<Animated.View style={[styles.container, { top: this.animatedValue }]}>
				<TouchableWithoutFeedback onPress={this._onPress} style={{ flex: 1 }}>
					<View style={styles.messageWrapper}>
						<Text style={styles.messageTitle}>New message</Text>
						<Text ellipsizeMode="tail" numberOfLines={2} style={styles.messageText}>
							{this.props.message}
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: 80,
		width: width - 60,
		backgroundColor: '#000',
		borderRadius: 20,
		opacity: 0.8,
	},
	messageWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	messageTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
		marginVertical: 5,
	},
	messageText: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
		textAlignVertical: 'center',
		marginHorizontal: 20,
	},
})
