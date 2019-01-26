import React from 'react';
import { Platform ,Text,Overlay,Card,TouchableHighlight,View} from 'react-native';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  render() {
    const { items, errors, loading, filter, overlayVisible, onLoadMore, onLoadItems, onOpenUrl, onToggleOverlay } = this.props

    return (
      <Card>
        {Platform.OS === 'android' ? (
          <StatusBar backgroundColor={'#d25500'} />
        ) : <View />}
        <View style={styles.body}>

          <Overlay visible={overlayVisible}>
            <Text style={{ fontSize: 18 }}>
              <Text style={{ fontWeight: 'bold' }}>HAgnostic News</Text> is a simple Hacker News reader for the Web and a React Native app (Android / iOS).
            </Text>
            <Text style={{ fontSize: 18, marginTop: 20 }}>
              Made with ❤ by
              <Text
                onPress={() => { onOpenUrl('https://grigio.org') }}>
                <Text style={[styles.aboutLink, cursorStyle]}>{" "}Luigi Maselli</Text>
              </Text>
              , source code:
              <Text
                onPress={() => { onOpenUrl('https://github.com/grigio/HAgnostic-News') }}>
                <Text style={[styles.aboutLink, cursorStyle]}>{" "}github.com/grigio/HAgnostic-News</Text>
              </Text>
            </Text>
          </Overlay>

          <View style={[styles.column, styles.header,
          Platform.OS === 'ios' ? { height: 75, paddingTop: 20 } : {}]}>
            <View style={[styles.row, { height: 50 }]}>
              <View style={styles.row}>
                <Image source={logo} style={{ width: 20 }} />
                <Text style={[{ fontWeight: 'bold', paddingLeft: 4 }]}>HAgnostic News</Text>
                <Text style={[{ fontSize: 12, paddingLeft: 4 }]}> {Platform.OS}</Text>
              </View>
              <TouchableHighlight
                style={[styles.button, filter === 'Top' ? styles.buttonOrange : null]}
                underlayColor={color.paperOrange200.color}
                onPress={() => { onLoadItems('Top'); this.scrollToTop() }}>
                <View style={styles.row}>
                  <Text style={{ color: 'white', fontWeight: 'bold', paddingRight: 5 }}>Top</Text>{filter === 'Top' && loading ? <ActivityIndicator /> : null}
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, filter === 'Latest' ? styles.buttonOrange : null]}
                underlayColor={color.paperOrange200.color}
                onPress={() => { onLoadItems('Latest'); this.scrollToTop() }}>
                <View style={styles.row}>
                  <Text style={{ color: 'white', fontWeight: 'bold', paddingRight: 5 }}>Latest</Text>{filter === 'Latest' && loading ? <ActivityIndicator /> : null}
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={color.paperOrange200.color}
                onPress={() => { onToggleOverlay() }}>
                <Text style={{ color: 'white', fontWeight: 'bold', padding: 10 }}>?</Text>
              </TouchableHighlight>
            </View>
            {Object.keys(errors).length > 0 ? (
              <View style={[styles.row, { flex: 1, backgroundColor: 'red' }]}>
                {Object.keys(errors).map((error, i) => (
                  <Text key={i}>. {errors[error].message}</Text>
                )
                )}
              </View>
            ) : null}

          </View>
          </View>
          </Card>
    );

    }

  }

