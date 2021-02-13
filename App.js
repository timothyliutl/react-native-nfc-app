import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NfcManager, { NfcTech, NfcEvents} from 'react-native-nfc-manager';
import { registerRootComponent } from 'expo';

function buildUrlPayload(valueToWrite) {
  return Ndef.encodeMessage([
      Ndef.uriRecord(valueToWrite),
  ]);
}





class App extends React.Component{
  
  onTap = () =>{
  console.log('hello')
  }

  nfcWrite = () =>{

  }
style = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}
constructor(props) {
  super(props);
  this.state = {
      supported: true,
      enabled: false,
      isWriting: false,
      urlToWrite: 'https://www.google.com',
     
      parsedText: null,
      tag: {},
  }
}

componentDidMount() {
  NfcManager.start();
}

componentWillUnmount() {
  this._cleanUp();
}

_cleanUp = () => {
  NfcManager.cancelTechnologyRequest().catch(() => 0);
}

_testNdef = async () => {
  try {
    let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: 'Ready to write some NFC tags!'
    });
    console.warn(resp);
    let ndef = await NfcManager.getNdefMessage();
    console.warn(ndef);
    let bytes = buildUrlPayload('https://www.revteltech.com');
    await NfcManager.writeNdefMessage(bytes);
    console.warn('successfully write ndef');
    await NfcManager.setAlertMessageIOS('I got your tag!');
    this._cleanUp();
  } catch (ex) {
    console.warn('ex', ex);
    this._cleanUp();
  }
}


  render(){
    
    return(
      
        <View style={this.style}>
          <Text onPress={this._testNdef}>
            Hello World
          </Text>
        </View>
      
    )
  }
}
export default App;
