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
		this.animatedValue1 = new Animated.Value(-100)
		this.animatedValue2 = new Animated.Value(0.8)
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

		this.animatedValue1.setValue(-100)
		this.animatedValue2.setValue(0.8)
		Animated.timing(this.animatedValue1, {
			toValue: 40,
			duration: 200,
		}).start()
	}

	hide = (delay = 400) => {
		if (this._timer) {
			clearTimeout(this._timer)
		}

		Animated.timing(this.animatedValue2, {
			toValue: 0,
			duration: delay,
		}).start(() => {
			this.animatedValue1.setValue(-100)
		})
	}

	_onPress = () => {
		this.hide(200)
		this.props.click()
	}

	render() {
		return (
			<Animated.View
				style={[styles.container, { top: this.animatedValue1, opacity: this.animatedValue2 }]}
			>
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
