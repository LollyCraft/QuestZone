import React from 'react';
import {Text,ScrollView,View,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {pressedPost} from './PostsScreen';


export class Example extends React.Component {
    static navigationOptions = {
        title: 'Single Post',
      };

      constructor(props) {
        super(props);
        this.title = pressedPost.title;
        this.username = pressedPost.username;
        this.post = pressedPost.post;

      }
    
    // getPost(){
    //     viewedPost = postsArray[pressedPost];
    // }

    render() {
        return (
            <View style={styles.container}>
                <View>
                <Text style={styles.title}>{this.title}</Text>
                <Text style={styles.username}>by @{this.username}</Text>
                <ScrollView>
                    <Text>{this.post}</Text>
                </ScrollView>
                </View>
                <Button onPress={()=> {this.goBack()}}
                    title="Back to the list"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: '#fff',
      paddingBottom: 10,
    },
    title:{
        fontSize: 30,
        fontWeight:'bold',
    },
    username:{
        fontSize: 10,
        color:'gray',
    }
});