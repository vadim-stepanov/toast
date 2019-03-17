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

export default class ToasterB extends React.Component {
	constructor(props) {
		super(props)
		this.animatedValue = new Animated.Value(width)
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

		this.animatedValue.setValue(width)
		Animated.timing(this.animatedValue, {
			toValue: 0,
			duration: 200,
		}).start()
	}

	hide = () => {
		if (this._timer) {
			clearTimeout(this._timer)
		}

		Animated.timing(this.animatedValue, {
			toValue: width,
			duration: 200,
		}).start()
	}

	_onPress = () => {
		this.hide()
		this.props.click()
	}

	render() {
		return (
			<Animated.View style={[styles.container, { left: this.animatedValue }]}>
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
		top: 0,
		height: 100,
		width: '100%',
		backgroundColor: '#3CB371',
	},
	messageWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30,
	},
	messageTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
	},
	messageText: {
		fontSize: 16,
		color: '#fff',
		width: width - 40,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
})
