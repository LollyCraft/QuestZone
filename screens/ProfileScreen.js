import React from 'react';
import {View, Text, Image,StyleSheet,TextInput,TouchableOpacity,Alert,ScrollView } from 'react-native';
import { Slider,Button, Card } from 'react-native-elements';
import {userLoggedInAtTheMonent} from './HomeScreen'; 
import {postsArray} from './PostsScreen';

import {postFromMainOrProfile} from './SinglePostScreen';


var added1Level = false;
var refreshed = false;

var viewedPostIndex = -1;
var doubletouch=0;
var currentPostIndex;

export var pressedPostOnProfile = {
  username:'test',
  title:'test',
  post:'test'
}


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Profile',
  };

  constructor(props) {
    super(props)
    this.state = { count: 0 , value: userLoggedInAtTheMonent.procentUntilNextLevel }
  }


  addExperienceLevel(){
    if(userLoggedInAtTheMonent.procentUntilNextLevel == 100 && added1Level == false){
      userLoggedInAtTheMonent.experienceLevel ++; 
      userLoggedInAtTheMonent.procentUntilNextLevel = 0;
      added1Level = true;
    }else if(userLoggedInAtTheMonent.procentUntilNextLevel != 100){
      added1Level = false;
    }
  }

  increaseExperience(){
    userLoggedInAtTheMonent.procentUntilNextLevel = userLoggedInAtTheMonent.procentUntilNextLevel + 10;
  }

  showPost(){
    //Alert.alert( viewedPostIndex + " showing post... " + doubletouch);
    //takes twice to get to the actual number of the post & gets stuck on the first post opened !!!!!!!!!!!!!!!!!!!
    if(viewedPostIndex == currentPostIndex) doubletouch++;
  }

  refreshPage(page){
    if(refreshed == false){
      page.forceUpdate();
      refreshed = true;
    }
    return;
  }
  

  render() {

    const {navigate} = this.props.navigation;

    //pressedPostOnProfile.title = 'test';

    if(userLoggedInAtTheMonent.username == undefined){
      return(<View style={styles.container}>
      <Button title="refresh page" onPress={()=>{this.forceUpdate()}}/>

      

          <View style={styles.header}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={this.onPress} >
                  <Image style={styles.avatar} source={picIcon} />
                </TouchableOpacity>

                <Text style={styles.name}>You are not logged in!</Text>
                
                <Button title="Log in/ Sign up here" onPress={()=>{this.props.navigation.navigate('Home')}}></Button>
            </View>
          </View>
      </View>
      );
    }else return (
      
      <View style={styles.container}>
        <Button title="refresh page" onPress={()=>{this.forceUpdate()}}/>

          <View style={styles.header}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={()=>{this.increaseExperience(); this.forceUpdate(); this.addExperienceLevel();}} >
                  <Image style={styles.avatar} source={picIcon} />
                </TouchableOpacity>

                <Text style={styles.name}>Name: {userLoggedInAtTheMonent.username}</Text>
                <Text style={styles.userInfo}>Password: {userLoggedInAtTheMonent.password} </Text>
                <Text style={styles.userInfo}>Location of User: {userLoggedInAtTheMonent.location} </Text>
                


                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/news/win8/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                  <Text style={styles.info}>News</Text>
                  </View>
                </View>

                 <View style={{width:200, alignItems: 'stretch', justifyContent: 'center'}}>
                  <Slider
                    value={userLoggedInAtTheMonent.procentUntilNextLevel}
                    disabled
                    maximumValue = {100}
                    step = {10}
                                              />
                  <Text style={justifyContent = 'center'}>{userLoggedInAtTheMonent.procentUntilNextLevel} out of 100</Text>
                  <Text style={styles.userInfo}>Level: {userLoggedInAtTheMonent.experienceLevel}</Text>

                  <Text style={styles.userInfo}>{'\n'}Nb of accepted quests by the User: {userLoggedInAtTheMonent.acceptedQuests.length - 1} </Text>
                  <Text>Quests accepted: {userLoggedInAtTheMonent.acceptedQuests.map((u, i) => {
                      return(<Text key={i}> {u.title} </Text>);
                      //the post title is not written
                      })}</Text>
                </View>
            </View>
         
          <Text style={styles.userInfo}>    Your Posts:</Text>  
          <Card containerStyle={{padding: 5}} >
          <ScrollView style={{paddingBottom:20,minHeight:442,maxHeight:442}}> 
                  {
                  postsArray.map((u, i) => {
                  if(u.username == userLoggedInAtTheMonent.username){

                    return (
                      <View key={i} style={styles.onePostContainer}>
                      <TouchableOpacity onPress={()=>{currentPostIndex = i; this.showPost(); //pressedPostOnProfile.title = 'test';
                            if(doubletouch == 2){   pressedPostOnProfile = postsArray[viewedPostIndex];
                                                    //postFromMainOrProfile = "profile";
                                                   pressedPostOnProfile.title = postsArray[viewedPostIndex].title;
                                                    this.props.navigation.navigate('SinglePost'); 
                                                    doubletouch = 0;
                                                    Alert.alert("OPENNING " + pressedPostOnProfile.title.toString());
                                                  }
                                                  viewedPostIndex = i; 
                                                  }}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>{i+1}.{u.title}</Text>
                      </TouchableOpacity>
                        <Text style={{color:'gray',fontWeight:'500'}}>by @{u.username}</Text>
                        <Text>{u.post}</Text> 
                      </View>
                      );
                                               }
                    })
                  }
                  </ScrollView>
            </Card>
                    

      </View>

      </View>
    );
  }
}

const picIcon = {
  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerOfContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  picContainer:{
    flex: 0.5,
    borderWidth: 1,
    backgroundColor: '#F2F2F2',
  },
  picStyle: {
    width:40, 
    height:40,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },

  //====================================================
  
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5,
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  onePostContainer:{
    borderWidth: 3,
    borderColor: '#E0E7F6',
    backgroundColor: '#FFFFFF',
    minHeight: 100,
    marginTop: 5,
    padding:5
  },
});