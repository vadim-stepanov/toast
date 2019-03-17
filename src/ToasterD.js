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

export default class ToasterD extends React.Component {
	constructor(props) {
		super(props)
		this.animatedValue1 = new Animated.Value(0)
		this.animatedValue2 = new Animated.Value(-100)
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

		this.animatedValue1.setValue(0)
		this.animatedValue2.setValue(40)
		Animated.timing(this.animatedValue1, {
			toValue: 1,
			duration: 400,
		}).start()
	}

	hide = (delay = 400) => {
		if (this._timer) {
			clearTimeout(this._timer)
		}

		Animated.timing(this.animatedValue1, {
			toValue: 0,
			duration: delay,
		}).start(() => {
			this.animatedValue2.setValue(-100)
		})
	}

	_onPress = () => {
		this.hide(200)
		this.props.click()
	}

	render() {
		return (
			<Animated.View
				style={[styles.container, { opacity: this.animatedValue1, top: this.animatedValue2 }]}
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
		backgroundColor: '#D3D3D3',
		borderRadius: 20,
		borderColor: '#000',
		borderWidth: 1,
	},
	messageWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	messageTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#696969',
		marginVertical: 5,
	},
	messageText: {
		fontSize: 16,
		color: '#696969',
		textAlign: 'center',
		textAlignVertical: 'center',
		marginHorizontal: 20,
	},
})
