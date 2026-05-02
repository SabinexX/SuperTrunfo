import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, Divider, Text, PaperProvider } from "react-native-paper";
import { cars } from "./data/cars.js";

export default function App() {
  // 👇 Troque o índice para ver outros carros: cars[0], cars[1], etc.
  const car = cars[0];

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.screen}>

        <Text variant="headlineLarge" style={styles.gameTitle}>
          🏎️ Super Trunfo
        </Text>

        <Text variant="labelLarge" style={styles.gameSubtitle}>
          Carros Antigos Brasileiros
        </Text>

        <View style={styles.cardWrapper}>
          <Card style={styles.card}>

            <Card.Cover source={car.image} style={styles.cardImage} />

            <Card.Title
              title={car.name}
              titleStyle={styles.cardName}
              titleVariant="headlineSmall"
            />

            <Card.Content>
              <View style={styles.chipsRow}>
                <Chip icon="factory" style={styles.chip} textStyle={styles.chipText}>
                  {car.brand}
                </Chip>

                <Chip icon="calendar" style={styles.chip} textStyle={styles.chipText}>
                  {car.year}
                </Chip>

                <Chip icon="earth" style={styles.chip} textStyle={styles.chipText}>
                  {car.origin}
                </Chip>
              </View>

              <Divider style={styles.divider} />

              <Text variant="bodyMedium" style={styles.description}>
                {car.description}
              </Text>

              <Divider style={styles.divider} />

              <View style={styles.starsRow}>
                <Text variant="labelLarge" style={styles.starsLabel}>
                  Avaliação:{"  "}
                </Text>

                <Text style={styles.stars}>{"⭐".repeat(car.stars)}</Text>
              </View>
            </Card.Content>

          </Card>
        </View>

      </ScrollView>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  gameTitle: {
    color: "#f5c518",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  gameSubtitle: {
    color: "#aaaaaa",
    marginBottom: 30,
    letterSpacing: 1,
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#16213e",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#f5c518",
    overflow: "hidden",
  },
  cardImage: {
    height: 220,
    borderRadius: 0,
  },
  cardName: {
    color: "#f5c518",
    fontWeight: "bold",
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: "#2a2a4a",
  },
  chipText: {
    color: "#ffffff",
    fontSize: 12,
  },

  divider: {
    backgroundColor: "#2a2a4a",
    marginVertical: 12,
  },

  description: {
    color: "#cccccc",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 22,
  },

  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  starsLabel: {
    color: "#aaaaaa",
  },
  stars: {
    fontSize: 20,
  },
  cardWrapper: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 20,
    elevation: 5,
  },

  card: {
    backgroundColor: "#16213e",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#f5c518",
    overflow: "hidden",
  },
});
