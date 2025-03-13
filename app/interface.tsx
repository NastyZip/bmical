import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; 
import { LinearGradient } from "expo-linear-gradient";

export default function Interface() {
  const router = useRouter();
  const { name } = useLocalSearchParams(); 

  const [selectedGender, setSelectedGender] = useState<"Male" | "Female" | null>(null);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const getHeightCategory = (height: number) => {
    if (height < 160) return "Short";
    if (height <= 180) return "Average";
    return "Tall";
  };

  const calculateBMI = () => {
    if (!selectedGender) {
      alert("Please select a gender before calculating BMI.");
      return;
    }
  
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const heightM = heightCm / 100;
  
    if (!isNaN(weightKg) && !isNaN(heightM) && heightM > 0) {
      const bmiValue = weightKg / (heightM * heightM);
      const formattedBmi = parseFloat(bmiValue.toFixed(2)); 
      let category = "";

      if (selectedGender === "Male") {
        if (bmiValue < 18.5) category = "Underweight";
        else if (bmiValue < 25) category = "Normal weight";
        else if (bmiValue < 30) category = "Overweight";
        else category = "Obese";
      } else if (selectedGender === "Female") {
        if (bmiValue < 18.0) category = "Underweight";
        else if (bmiValue < 24) category = "Normal weight";
        else if (bmiValue < 29) category = "Overweight";
        else category = "Obese";
      }

      const heightCategory = getHeightCategory(heightCm);

      router.push({
        pathname: "/results",
        params: { 
          bmi: formattedBmi.toString(), 
          category, 
          age, 
          weight, 
          height, 
          heightCategory 
        },
      });
    } else {
      alert("Please enter valid weight and height.");
    }
  };
  
  return (
    <LinearGradient colors={["#23272A", "#2C2F33", "#5865F2"]} style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Hello, {name || "Guest"}!</Text> 
      </View>

      <View style={styles.whiteBox}>
        <Image source={require("../assets/images/2.png")} style={styles.image} />

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedGender === "Male" && styles.selectedButton]}
            onPress={() => setSelectedGender("Male")}
          >
            <Text style={[styles.toggleText, selectedGender === "Male" && styles.selectedText]}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, selectedGender === "Female" && styles.selectedButton]}
            onPress={() => setSelectedGender("Female")}
          >
            <Text style={[styles.toggleText, selectedGender === "Female" && styles.selectedText]}>Female</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.whiteBox1}>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your Age" 
          placeholderTextColor="#B9BBBE"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Enter your Weight (kg)" 
          placeholderTextColor="#B9BBBE"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Enter your Height (cm)" 
          placeholderTextColor="#B9BBBE"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBack} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  rowContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  text: { fontSize: 32, opacity: 0.8, fontWeight: "bold", color: "#F2F3F5", marginBottom: 20 },

  whiteBox: { 
    backgroundColor: "#2C2F33", 
    padding: 20, 
    borderRadius: 15, 
    alignItems: "center", 
    width: 360, 
    elevation: 5, 
    shadowOpacity: 0.2, 
    shadowRadius: 5,
    height: 670, 
  },
  whiteBox1: { 
    backgroundColor: "#2C2F33", 
    padding: 20, 
    borderRadius: 15, 
    alignItems: "center", 
    width: 360, 
    elevation: 5,
    marginTop: 40,  
    shadowOpacity: 0.2, 
    shadowRadius: 5,
    height: 670, 
  },
  image: { width: 380, height: 150, borderRadius: 10, marginBottom: 30, marginTop: 30 },

  toggleContainer: {
    flexDirection: "row",
    borderRadius: 12,
    width: "111%",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#40444B",
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleText: { fontSize: 18, color: "#F2F3F5", fontWeight: "bold" },
  selectedButton: { backgroundColor: "#5865F2", borderRadius: 8 },
  selectedText: { color: "#F2F3F5" },
  input: { 
    width: "100%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#5865F2", 
    borderRadius: 10, 
    paddingLeft: 15, 
    fontSize: 18, 
    backgroundColor: "#40444B", 
    color: "#F2F3F5", 
    marginBottom: 10,
  },
  button: { 
    backgroundColor: "#5865F2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
  },
  buttonBack: { 
    backgroundColor: "#ED4245", 
    paddingVertical: 12, 
    width: "100%",
    paddingHorizontal: 20, 
    borderRadius: 10, 
    marginTop: 15, 
  },
  buttonText: { fontSize: 16, color: "#F2F3F5", fontWeight: "bold", textAlign: "center" },
});
