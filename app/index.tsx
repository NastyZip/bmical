import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";  

export default function Index() {
  const router = useRouter(); 
  const [name, setName] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#23272A", "#2C2F33", "#5865F2"]} style={styles.container}>
      <Image source={require("../assets/images/1.png")} style={styles.image} />
      <Text style={styles.text1}>Welcome!</Text>

      <View style={styles.whiteBox}>
        <Text style={styles.text}>What is your Nickname?</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Enter your Nickname" 
          placeholderTextColor="#B9BBBE"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/interface", params: { name } })}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 250, height: 250, marginBottom: 20 },
  whiteBox: { 
    backgroundColor: "#23272A", 
    padding: 20, 
    borderRadius: 15, 
    alignItems: "center", 
    width: 360, 
    height: 375, 
    elevation: 5, 
    shadowOpacity: 0.2, 
    shadowRadius: 5 
  },
  text: { fontSize: 24, color: "#F2F3F5", fontFamily: "Poppins_700Bold", marginBottom: 10 },
  text1: { fontSize: 50, color: "#F2F3F5", fontFamily: "Poppins_700Bold", marginBottom: 10, opacity: 0.8 },
  input: { 
    width: "100%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#5865F2", 
    borderRadius: 10, 
    paddingLeft: 15, 
    fontSize: 18, 
    fontFamily: "Poppins_400Regular", 
    backgroundColor: "#40444B", 
    color: "#F2F3F5", 
    marginBottom: 10 
  },
  button: { 
    backgroundColor: "#5865F2", 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    position: "absolute", 
    bottom: 10, 
    right: 10 
  },
  buttonText: { fontSize: 20, color: "#F2F3F5", fontFamily: "Poppins_700Bold" },
});
