import React from 'react';
import {Text,ScrollView,View,StyleSheet,Alert,RefreshControl} from 'react-native';
import {Button} from 'react-native-elements';
import {pressedPost} from './PostsScreen';
import {pressedPostOnProfile} from './ProfileScreen'
import { userLoggedInAtTheMonent } from './HomeScreen';

var openedPost={
    username: 'test',
    title: 'test',
    post: 'test'
}

var alreadyAcceptedQuest = false;

export var postFromMainOrProfile; //false = Main ; true=Profile   
//it is read only...need to find a way to overwrite this 


export default class SinglePostScreen extends React.Component {
    static navigationOptions = {
        title: 'SinglePost',
      };

      constructor(props) {
        super(props);
        this.state = {refreshing: false};
      }

      refreshPage(pageRefreshed){
        if(pageRefreshed == false){
            this.forceUpdate();
            pageRefreshed = true;
        }
      }

    render() {
        //if(postFromMainOrProfile == "main"){
        openedPost.username = pressedPost.username;
        openedPost.post = pressedPost.post;
        openedPost.title = pressedPost.title;
        //}

        //if(postFromMainOrProfile == "profile"){
        if(pressedPostOnProfile.title != 'test'){
            //need to press 2 times to get to posts from main
            //Alert.alert("PressedPostOnProfile");
            //gets blocked in here after a post from profile is opened once
            openedPost.username = pressedPostOnProfile.username;
            openedPost.post = pressedPostOnProfile.post;
            openedPost.title = pressedPostOnProfile.title;
        }   

        if(openedPost.title == 'test'){
            return(
                <View style={styles.container}>
                <Button title="refresh page" onPress={()=>{this.forceUpdate()}}/>
                    <Text style={styles.title}> There were no posts selected to be seen! </Text>
                </View>
            );
        }else{
            return (
            <View style={[styles.container]}>
                <Button title="refresh page" onPress={()=>{this.forceUpdate()}}/>

                <View style={{paddingTop:10,paddingBottom:10}}>

                <View style={[styles.center,styles.wholePostContainer]}>
                    <Text style={styles.title}>{openedPost.title}</Text>
                    <Text style={styles.username}>by @{openedPost.username}</Text>
                </View>

                <View style={[styles.post]}>
                <ScrollView style={styles.post}> 
                    <Text>{openedPost.post}</Text>
                </ScrollView>
                </View>

                </View>

                <View style={{flexDirection:'row',justifyContent:'center'}}>

                    <Button onPress={()=> {this.props.navigation.navigate('Posts'); 
                                        postFromMainOrProfile = false; }}
                        title="Back to the list"/>

                    <Text>                       </Text>    

                    <Button onPress={()=> { 
                        userLoggedInAtTheMonent.acceptedQuests.map((u, i) => {
                            if(openedPost.title == u.title){
                                alreadyAcceptedQuest = true;
                            }
                        });

                        //it gets stuck saying that youve already accepted the quest even if its another one...sth wrong with openedPost(i think)
                        
                        
                        if(alreadyAcceptedQuest == false){
                            if(userLoggedInAtTheMonent.username == openedPost.username){
                                Alert.alert("You can't accept your own posts");
                                
                            }else if(userLoggedInAtTheMonent.username != undefined){
                                userLoggedInAtTheMonent.acceptedQuests.push(openedPost);
                                Alert.alert("Quest accepted!");

                            }else{
                                Alert.alert("You must log in first");
                            }
                        }else{
                            Alert.alert("You've already accepted this quest");
                        }

                        alreadyAcceptedQuest = false;
                    }}
                        title="Accept quest"/>
                
                </View>


            </View>
        );
        }
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
    },
    center:{
        alignItems:'center',
    },
    wholePostContainer:{
        minHeight:50,
        backgroundColor:'#FFFFFF',
        borderWidth: 3,
        borderColor: '#E0E7F6',
        paddingBottom: 20,
        paddingTop: 20,
    },
    post:{
        minHeight:300,
        minWidth: 200,
        backgroundColor:'#FFFFFF',
        borderWidth: 2,
        borderColor: '#C0D3FF',
        paddingBottom: 20,
        paddingTop: 20,
    }
});