import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressChart } from "react-native-chart-kit";

const bmiCategories = [
  { label: "Underweight", range: [0, 18.4], color: "#85C1E9" },
  { label: "Normal", range: [18.5, 24.9], color: "#57F287" },
  { label: "Overweight", range: [25, 29.9], color: "#F1C40F" },
  { label: "Obese", range: [30, 100], color: "#E74C3C" },
];

const heightCategories = [
  { label: "Short", range: [0, 159], color: "#E74C3C" },
  { label: "Average", range: [160, 179], color: "#F1C40F" },
  { label: "Tall", range: [180, 300], color: "#57F287" },
];


export default function Results() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const bmiValue = parseFloat(Array.isArray(params.bmi) ? params.bmi[0] : params.bmi);
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const age = Array.isArray(params.age) ? params.age[0] : params.age;
  const weight = Array.isArray(params.weight) ? params.weight[0] : params.weight;
  const height = Array.isArray(params.height) ? params.height[0] : params.height;
  const heightCategory = Array.isArray(params.heightCategory) ? params.heightCategory[0] : params.heightCategory;

  const bmiPercentage = Math.min(bmiValue / 40, 1);

  return (
    <LinearGradient colors={["#23272A", "#2C2F33", "#5865F2"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.headerText}>Your BMI Result</Text>

        <View style={styles.whiteBox}>
          <View style={styles.progressContainer}>
            <ProgressChart
              data={{ data: [bmiPercentage] }}
              width={180}
              height={180}
              strokeWidth={12}
              radius={60}
              chartConfig={{
                backgroundGradientFrom: "#2C2F33",
                backgroundGradientTo: "#2C2F33",
                color: (opacity = 1) => `rgba(87, 242, 135, ${opacity})`,
              }}
              hideLegend={true}
            />
            <Text style={styles.bmiValue}>{bmiValue.toFixed(1)}</Text>
          </View>

          <Text style={styles.categoryText}>
            You have <Text style={styles.boldText}>{category}</Text> body weight!
          </Text>

         
          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Age</Text>
              <Text style={styles.detailValue}>{age} yrs</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Weight</Text>
              <Text style={styles.detailValue}>{weight} Kg</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Height</Text>
              <Text style={styles.detailValue}>{height} Cm</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>BMI Categories</Text>
          <View style={styles.bmiTable}>
            {bmiCategories.map(({ label, range, color }) => {
              const normalizedCategory = category ? category.toLowerCase().replace(" weight", "").trim() : "";

              const isCurrentCategory = normalizedCategory === label.toLowerCase();

              console.log(`Comparing: ${normalizedCategory} === ${label.toLowerCase()} → ${isCurrentCategory}`);

              return (
                <View key={label} style={[styles.bmiRow, isCurrentCategory ? styles.highlightBackground : null]}>
                  <View style={[styles.bmiCircle, { backgroundColor: color }]} />
                  <Text style={[styles.bmiLabel, isCurrentCategory && styles.highlightText]}>
                    {label}
                  </Text>
                  <Text style={[styles.bmiRange, isCurrentCategory && styles.highlightText]}>
                    {range[0]} - {range[1]}
                  </Text>
                </View>
              );
            })}
          </View>

              <Text style={styles.sectionTitle}>Height Categories</Text>
              <View style={styles.bmiTable}>
                {heightCategories.map(({ label, range, color }) => {
                  const isCurrentHeight = heightCategory === label;
                  return (
                    <View key={label} style={[styles.bmiRow, isCurrentHeight ? styles.highlightBackground : null]}>
                      <View style={[styles.bmiCircle, { backgroundColor: color }]} />
                      <Text style={[styles.bmiLabel, isCurrentHeight && styles.highlightText]}>
                        {label}
                      </Text>
                      <Text style={[styles.bmiRange, isCurrentHeight && styles.highlightText]}>
                        {range[0]} - {range[1]} cm
                      </Text>
                    </View>
                  );
                })}
              </View>

          
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, alignItems: "center", padding: 20 },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#F2F3F5", marginBottom: 15 },

  whiteBox: {
    backgroundColor: "#2C2F33",
    padding: 20,
    borderRadius: 15,
    width: "113%",
    height: "97%",
    alignItems: "center",
    shadowOpacity: 0.2,
    
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  detailBox: {
    backgroundColor: "#40444B",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
    
  },
  detailLabel: { fontSize: 14, fontWeight: "bold", color: "#F2F3F5" },
  detailValue: { fontSize: 16, color: "#F2F3F5" },
  progressContainer: { alignItems: "center", marginBottom: 10 },
  bmiValue: { position: "absolute", fontSize: 28, fontWeight: "bold",top:70, color: "#F2F3F5" },

  categoryText: { fontSize: 18, fontWeight: "bold", color: "#F2F3F5", textAlign: "center", marginBottom: 15 },
  boldText: { color: "#57F287", fontWeight: "bold" },

  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#F2F3F5", marginVertical: 10 },

  bmiTable: { width: "100%", paddingHorizontal: 20 },
  bmiRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderRadius: 10 },
  bmiCircle: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  bmiLabel: { fontSize: 16, fontWeight: "bold", color: "#F2F3F5", flex: 1 },
  bmiRange: { fontSize: 16, color: "#F2F3F5" },

  highlightBackground: { backgroundColor: "#4CAF50", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
  highlightBackgroundbmi: { backgroundColor: "#4CAF50", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
  highlightText: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },

  button: { backgroundColor: "#5865F2", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, marginTop: 40,width:"100%"},
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#F2F3F5", textAlign: "center" },
});