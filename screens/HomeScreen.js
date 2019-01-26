import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { Button } from 'react-native-elements'
import { paddedString } from 'uuid-js';

export var Users = [
  { username:'A',
    password:'a',
    details: 'aaaaaaaaaaa',
    location: 'aaaa city' ,
    experienceLevel: 4,
    procentUntilNextLevel:0,
    acceptedQuests:[{
        username:'test',
        title:'test',
        post:'test'
    }]
    },
  { username:'B',
    password:'b',
    details: 'bbbb',
    location: 'bbbbb city' ,
    experienceLevel: 5,
    procentUntilNextLevel: 0,
    acceptedQuests:[{
        username:'test',
        title:'test',
        post:'test'
    }]
},
]

var foundUser = false;
var wrongUser = false;
var loggedInState = false;
var whichUser = -1;
export var userLoggedInAtTheMonent = {  username: undefined, 
                                        password: undefined,
                                        details: undefined,
                                        location: undefined ,
                                        experienceLevel: 0,
                                        procentUntilNextLevel: 0,
                                        acceptedQuests:[{
                                            username:'test',
                                            title:'test',
                                            post:'test'
                                        }]
                                    };

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
      super(props);
      navigate = props.navigation,
      this.state2={email:'',password:'',device_token:'',device_type:''};
  } 

  state = {
    modalVisible: false,
  };

  openCloseModal(visible) {
    this.setState({modalVisible: visible});
  }

  loginUser(){
    Users.forEach(user => {
      if(foundUser == false){
        if(this.state.username == user.username && this.state.password == user.password){
          foundUser = true;
          whichUser = Users.indexOf(user);
        }else 
          wrongUser = true;
      }
    });
    if(foundUser == true && loggedInState == false){

      this.props.navigation.navigate('Posts');
      foundUser=false;
      wrongUser = false;
      loggedInState = true;
      userLoggedInAtTheMonent = Users[whichUser];

    }else if(loggedInState == true){
        Alert.alert("You are already logged in");
    }else if(wrongUser == true){
        Alert.alert("Password or Username incorect");
        wrongUser = false;
    }
  }

  signUpUser(){
        Users.push(
            {
                username: this.state.username,
                password: this.state.password,
                details: this.state.details,
                location: this.state.location,
                experienceLevel: 0,
                procentUntilNextLevel: 0,
                acceptedQuests:this.state.acceptedQuests
            }
        );
        userLoggedInAtTheMonent={
            username: this.state.username,
            password: this.state.password,
            details: this.state.details,
            location: this.state.location,
            experienceLevel: this.state.experienceLevel,
            procentUntilNextLevel: this.state.procentUntilNextLevel,
            acceptedQuests: this.state.acceptedQuests,
        }
        this.props.navigation.navigate('Posts');
        loggedInState = true;
        
  }

  logoutUser(){
      loggedInState = false;
      Alert.alert("You've logged out");
      userLoggedInAtTheMonent={
        username: undefined,
        password: undefined,
        details:  undefined,
        location: undefined,
        experienceLevel: 0,
        procentUntilNextLevel: 0,
        acceptedQuests:[{
            username:'test',
            title:'test',
            post:'test'
        }],
    }
  }

  emptyStateText(){
      this.state.username = '';
      this.state.password = '';
      this.state.details  = '';
      this.state.location = ''
  }

  render(){
      const {navigate} = this.props.navigation;
      return(
          <View style={styles.container}>


                  <View style={styles.content}>
                      <Text style={styles.logo}>- Log in here -</Text>
                      <Text style={styles.instructions}>else continue as a guest {'\n'}
                                                  by clicking on the botton tab</Text>

                      <View style={[styles.inputContainer,paddingBottom=30]}>
                        <TextInput underlineColorAndroid='transparent' style={styles.input}
                                     onChangeText={(username) => this.setState({username})}
                                     value={this.state.username}
                                     placeholder='username' />

                        <TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
                                     onChangeText={(password) => this.setState({password})} 
                                     value={this.state.password} placeholder='password'/>
                        </View>
                  </View>

                  <View style={{flexDirection:'row',alignContent:'space-between',paddingBottom:10}}>
                        <Button
                            onPress={() => {this.loginUser(); 
                                            this.emptyStateText();}}
                            title="Log in"/>

                            <Text>  </Text>

                        <View>
                        <Button title="Sign up" style={{paddingBottom: 10}}
                            onPress={() => {this.openCloseModal(true)}}/>

                        <Text style={[styles.instructions]}>Don't have an account? {'\n'} SIGN UP HERE !</Text>
                        </View>

                        <Text>  </Text>

                        <Button style={{paddingBottom: 5}}
                            onPress={() => {this.logoutUser(); 
                                            this.emptyStateText();}}
                            title="Log out"/>
                    </View>
                      <Text style={[styles.instructions]}>Existent users:</Text>
                            {Users.map((u, i) => {
                                           return(<Text key={i}>{u.username}</Text>);
                                        })}

                  <Modal animationType="slide"
                        transparent={false} 
                        style={styles.centerOfContainer}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            this.openCloseModal(!this.state.modalVisible);}}>

                                <View style={styles.inputContainer}>
                                    <TextInput underlineColorAndroid='transparent' style={styles.input}
                                        onChangeText={(username) => this.setState({username})}
                                        value={this.state.username}
                                        placeholder='username' />

                                    <TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
                                        onChangeText={(password) => this.setState({password})}
                                        value={this.state.password} placeholder='password'/>
                                    
                                    <TextInput underlineColorAndroid='transparent' style={styles.input}
                                        onChangeText={(location) => this.setState({location})}
                                        value={this.state.location} placeholder='location/address (optional)'/>

                                    <Button title="Create Account"
                                        onPress={()=>{
                                            if(loggedInState == true){
                                                Alert.alert("You are already logged in with user "+ Users[whichUser].username.toString());
                                            }else if(this.state.username == undefined || this.state.password == undefined){
                                                    Alert.alert("Not all gaps are completed");
                                            }else{
                                                this.signUpUser();
                                                this.openCloseModal(!this.state.modalVisible);
                                            }
                                            //this.emptyStateText();
                                        }}/>

                                    <Button onPress={()=>{
                                        this.openCloseModal(!this.state.modalVisible);}}
                                    title="Back"/>
                                </View>

                    </Modal>
              
          </View>
      )
  }
}

const styles=StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#F5FCFF',
  },
  backgroundImage:{
      flex:1,
      alignSelf:'stretch',
      width:null,
      justifyContent:'center',
  },
  welcome:{
      fontSize:20,
      textAlign:'center',
      margin:10,
  },
  instructions:{
      textAlign:'center',
      color:'#333333',
      marginBottom:5,
  },
  content:{
      alignItems:'center',
  },
  logo:{
      color:'white',
      fontSize:40,
      fontStyle:'italic',
      fontWeight:'bold',
      textShadowColor:'#252525',
      textShadowOffset:{width:1,height:1},
      textShadowRadius:5,
      marginBottom:20,
      minHeight: 90,
  },
  inputContainer:{
      margin:20,
      marginBottom:0,
      padding:20,
      paddingBottom:10,
      alignSelf:'stretch',
      borderWidth:1,
      borderColor:'#fff',
      backgroundColor:'rgba(255,255,255,0.2)',
  },
  input:{
      fontSize:16,
      height:40,
      padding:10,
      marginBottom:10,
      backgroundColor:'rgba(255,255,255,1)',
  },
});
