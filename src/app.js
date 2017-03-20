import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase'
import {Header, Button, Spinner} from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {

    state = { loggedIn: null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAyF95XgGrGPYmCj71CkSpN61_lpC0LY0c",
            authDomain: "react-native-4a691.firebaseapp.com",
            databaseURL: "https://react-native-4a691.firebaseio.com",
            storageBucket: "react-native-4a691.appspot.com",
            messagingSenderId: "916743293533"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false })
            }
        })
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={()=> firebase.auth().signOut()}>Log Out</Button>
                )
            case false:
                return <LoginForm/>

            default:
                return <Spinner size="large"/>

        }
    }


    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;