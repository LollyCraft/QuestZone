import React from 'react';
import { ScrollView, StyleSheet, Text,
        Alert,View,Modal,TextInput,TouchableOpacity, Overlay} from 'react-native'; 
import { Card,Button } from 'react-native-elements' ;     

import {userLoggedInAtTheMonent} from './HomeScreen';

import {postFromMainOrProfile} from './SinglePostScreen';

//alert if there are unfilled boxes for adding a post

export var postsArray = [
  { username:'Username',
    title:'Title',
    post:'Text'},
    { username:'Username2',
    title:'Title2',
    post:'Text2'
    },
];

var viewedPostIndex = -1;
var doubletouch=0;
var currentPostIndex;


export var pressedPost = {
    username:'test',
    title:'test',
    post:'test'
}

export default class PostsScreen extends React.Component {
  static navigationOptions = {
    title: 'Posts',
  };

  state = {
    modalVisible: false,
    isVisibleAlertBar: false
  };


  constructor(props) {
    super(props);
    this.state2 = { textForPost: '' };
    this.state3 = { titleForPost: '' };
    this.state4 = { userForPost: '' };
    //this.scrollToTop = this.scrollToTop.bind(this);
  }


  openCloseModal(visible) {
    this.setState({modalVisible: visible});
  }

  addPosts(){
    if(userLoggedInAtTheMonent.username != undefined && this.state.textForPost != undefined && this.state.titleForPost != undefined){
      postsArray.push({
        username: userLoggedInAtTheMonent.username,
        title: this.state.titleForPost,
        post: this.state.textForPost
      });
    }     
  }

  scrollToTop() {
    //leave this for the moment
    if(this.refs._scrollView.scrollTo() != undefined)
      this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true })
  }

  showPost(){
    //Alert.alert( viewedPostIndex + " showing post... " + doubletouch);
    //takes twice to get to the actual number of the post & gets stuck on the first post opened !!!!!!!!!!!!!!!!!!!
    
    if(viewedPostIndex == currentPostIndex) doubletouch++;
  }

  addPostAsLoggedInUser(){
    if(userLoggedInAtTheMonent.username != undefined){
      this.userForPost = userLoggedInAtTheMonent.username;
      return(<Text>{userLoggedInAtTheMonent.username}</Text>);
    }
  }

  emptyStates(){
    this.state.titleForPost = undefined;
    this.state.textForPost = undefined;
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.postsContainer}>

          <Card
            title='Posts here'>
            <Text>double click to open posts and press "refresh" to see the selected post</Text>
            <Card containerStyle={{padding: 5}} >
                  {
                  postsArray.map((u, i) => {
                    return (
                      <View key={i} style={styles.onePostContainer}>

                      <TouchableOpacity onPress={()=>{currentPostIndex = i; this.showPost();
                            if(doubletouch == 2){   pressedPost = postsArray[viewedPostIndex];
                                                    //postFromMainOrProfile = "main";
                                                    this.props.navigation.navigate('SinglePost'); 
                                                    doubletouch = 0;
                                                    Alert.alert("OPENNING " + pressedPost.title.toString());
                                                  }
                                                  viewedPostIndex = i; 
                                                  }}>
                        <Text style={{fontSize:20,fontWeight:'bold',paddingBottom:2}}>{i+1}.{u.title}</Text>
                      </TouchableOpacity>
                      
                        <Text style={{color:'gray',fontWeight:'500',paddingBottom:10}}>by @{u.username}</Text>
                        <Text>{u.post}</Text> 
                      </View>
                      );
                    })
                  }
            </Card>
          </Card>
        </ScrollView>

        <Button onPress={()=> {if(userLoggedInAtTheMonent.username != undefined){
                                this.openCloseModal(true);
                              }else{
                                Alert.alert("You are not logged in");
                              }}}
            title="Add new post"/>

        <Modal
          animationType="slide"
          transparent={false} 
          style={styles.wholeModalContainer}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.openCloseModal(!this.state.modalVisible);
          }}>
          <View style={styles.wholeModalContainer}>

          <Text style={{fontSize:15,fontWeight:"bold",paddingBottom:10}}>Username:</Text>
          {this.addPostAsLoggedInUser()}
          
          <Text style={{fontSize:15,fontWeight:"bold",paddingTop: 10, paddingBottom: 10}}>Title:</Text>
          <TextInput underlineColorAndroid='transparent' style={styles.input} placeholder="Type in the title of your post"
                         onChangeText={TitleInputValue => this.setState({titleForPost : TitleInputValue})}
                         />

          
            <View style={[styles.typePostContainer]}>
            <ScrollView style={{maxWidth:600,maxHeight:500}}>
              <TextInput underlineColorAndroid='transparent' style={[styles.inputPost]} placeholder="Type your post" multiline={true}
                         onChangeText={TextInputValue => this.setState({textForPost : TextInputValue})}
                         />
            </ScrollView>
            </View>
          

          <View style={{flexDirection:'row',alignContent:'space-between',paddingTop:10}}>
              <Button style={alignItems="flex-start"} onPress={()=>{

                  if(this.state.titleForPost == undefined || this.state.textForPost == undefined){
                    //change to == but then it gets blocked in here
                    Alert.alert("Not all gaps are completed");
                   }else{
                    this.addPosts();
                    this.openCloseModal(!this.state.modalVisible);
                    this.emptyStates();
                   }
                
                }}
                  title="Add"/>

                  <Text>                    </Text>

              <Button style={alignItems="flex-end"} onPress={()=>{
                this.openCloseModal(!this.state.modalVisible);
                }}
                  title="Cancel"/>
            </View>

            </View>
        </Modal>

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
  centerOfContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  wholeModalContainer:{
    paddingTop: 50,
    alignItems: 'center',
    //justifyContent: 'center'
  },
  postsContainer:{
    backgroundColor: '#F2F2F2',
  },
  modalContainer:{
    borderWidth: 3,
    backgroundColor: '#F2F2F2',
    paddingTop: 20,
  },
  typePostContainer:{
    borderWidth: 3,
    minHeight: 100,
    minWidth: 600,
  },
  onePostContainer:{
    borderWidth: 3,
    borderColor: '#E0E7F6',
    backgroundColor: '#FFFFFF',
    minHeight: 100,
    marginTop: 10,
    padding:5
  },
  input:{
    fontSize:16,
    height:40,
    padding:10,
    marginBottom:10,
    backgroundColor:'rgba(255,255,255,1)',
  },
  inputPost:{
    fontSize:16,
    height:600,
    padding:10,
    marginBottom:10,
    backgroundColor:'rgba(255,255,255,1)',
    maxWidth:400,
  }
});
