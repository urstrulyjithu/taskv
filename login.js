import React  , {Component} from 'react'
import { View, Text , Pressable  , StyleSheet, Animated} from 'react-native'
import OneSignal from 'react-native-onesignal';
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding';
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-player';

class Login extends Component {
    constructor() {
        super()        
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
           
            paddingAnimation: new Animated.Value(2),
          
            paused:true,
            Address: null        
                }
            }
    componentDidMount() {
        Geocoder.init("AIzaSyBO4b3GmJbxCauVym2EWL0eyRQy0cGHpD0")
          Geolocation.getCurrentPosition(
              (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log(position , this.state.longitude , this.state.latitude);

                Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(json => {
                    console.log(json);
                
                    var addressComponent = json.results[0].address_components;
                    this.setState({
                        Address: addressComponent
                    })
                    console.log(addressComponent);
                }) 
                .catch(error => console.log(error));
              },
              (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
       
      }

    async deviceId(){
        const {userId} = await OneSignal.getDeviceState();
        
        console.log("fghj",{userId});
    }

    pause(){
        this.setState({paused : !this.state.paused})
    }


    animatedBall = ()=> {
        Animated.timing( this.state.paddingAnimation, { toValue:-10, duration: 5000}).start();
        // Animated.timing( this.state.paddingAnimation1, { toValue:10, duration: 1000}).start();
    }
    render(){
        const ballAnimation= {
            marginLeft : this.state.ballAnimation
        }
    return (

       
        <View>

{/* <Video
source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1' }}
style={{ width: 300, height: 300 }}
controls={true}
ref={(ref) => {
this.player = ref
}} /> */}
<View style={{flexDirection:"row" , margin: 13,}}>
    <Animated.View  style={[{right: this.state.paddingAnimation}]}>
<VideoPlayer
    paused={this.state.paused}
    autoplay={true}
    video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
    videoWidth={40}
    videoHeight={40}
    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
/>
</Animated.View>
<Animated.View  style={[{left: this.state.paddingAnimation}]}>
<VideoPlayer
 paused={this.state.paused}
 autoplay={true}
    video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
    videoWidth={40}
    videoHeight={40}
    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
/>
</Animated.View>

</View>
<View style={{ flexDirection:"row"}} >
<Pressable style={{borderWidth:1 ,borderRadius: 50,backgroundColor:"light-grey", width : 60 , margin: 20,}} onPress={()=>this.pause()} >
    <Text style={{padding:10 , fontSize:12, }}> {this.state.paused ? "start" : "pause"}</Text>
</Pressable>


<Pressable style={{borderWidth:1 ,borderRadius: 50,backgroundColor:"light-grey", width : 50 , margin: 20,}} onPress={()=>this.animatedBall()} >
    <Text style={{padding:10 , fontSize:12, paddingHorizontal:10  }}>shift </Text>
</Pressable>

</View>


            {/* <Pressable onPress={()=> this.deviceId()}>
            <Text>Login</Text>
            </Pressable>    */}
        </View>
    )}
}

export default Login

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
