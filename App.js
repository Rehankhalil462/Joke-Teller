import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { Avatar } from "react-native-paper";
import * as Speech from "expo-speech";

export default function App() {
  const [onSpeaking, setOnSpeaking] = useState(false);
  const socialMediaHandler = (link) => {
    Linking.openURL(link);
  };

  const apiHandler = async (param) => {
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${param}?blacklistFlags=sexist&type=twopart`
      );
      const data = await response.json();
      setOnSpeaking(true);
      Speech.speak(`Question : ${data.setup}.....`, { rate: 0.9 });
      Speech.speak(`Answer : ..... ${data.delivery}`, {
        rate: 0.9,
        onDone: () => setOnSpeaking(false),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("./assets/robot.gif")}
          style={styles.backgroundImage}
        >
          <TouchableOpacity
            disabled={onSpeaking ? true : false}
            style={onSpeaking ? styles.onSpeaking : styles.button}
            onPress={() => apiHandler("Programming")}
          >
            <Text style={styles.buttonText}>Tell Me A Programming Joke</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={onSpeaking ? true : false}
            style={onSpeaking ? styles.onSpeaking : styles.button}
            onPress={() => apiHandler("Dark")}
          >
            <Text style={styles.buttonText}>Tell Me A Dark Joke</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={onSpeaking ? true : false}
            style={onSpeaking ? styles.onSpeaking : styles.button}
            onPress={() => apiHandler("Spooky")}
          >
            <Text style={styles.buttonText}>Tell Me A Spooky Joke</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={onSpeaking ? true : false}
            style={onSpeaking ? styles.onSpeaking : styles.button}
            onPress={() => apiHandler("Pun")}
          >
            <Text style={styles.buttonText}>Tell Me A Pun Joke</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.socialMediaIconsContainer}>
        <TouchableOpacity
          onPress={() =>
            socialMediaHandler(
              "https://www.youtube.com/devtechcare?sub_confirmation=1"
            )
          }
        >
          <Avatar.Icon icon="youtube" style={{ backgroundColor: "#c4302b" }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            socialMediaHandler("https://www.facebook.com/devtechcare")
          }
        >
          <Avatar.Icon icon="facebook" style={{ backgroundColor: "#3b5998" }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            socialMediaHandler("https://github.com/rehankhalil462")
          }
        >
          <Avatar.Icon
            icon="github"
            color="white"
            style={{ backgroundColor: "black" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            socialMediaHandler("https://pk.linkedin.com/in/devtechcare")
          }
        >
          <Avatar.Icon
            icon="linkedin"
            color="white"
            style={{ backgroundColor: "#0e76a8" }}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.9,
  },
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: "center",
    alignItems: "center",
  },
  onSpeaking: {
    marginBottom: 40,
    marginHorizontal: 20,
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 15,
    opacity: 0.7,

    backgroundColor: "#1d1d3b",
  },

  button: {
    marginBottom: 40,
    marginHorizontal: 20,
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 15,
    opacity: 0.9,
    backgroundColor: "#1d1d3b",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  socialMediaIconsContainer: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
