import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View, Animated, Easing, } from "react-native";
import { Card, Chip, Divider, Text, PaperProvider, Button } from "react-native-paper";
import { cars } from "./data/cars.js";

export default function App() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const glowAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const car = cars[index];
  const nextCar = cars[(index + 1) % cars.length];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Comum":
        return "#aaaaaa";
      case "Raro":
        return "#3b82f6";
      case "Épico":
        return "#a855f7";
      case "Lendário":
        return "#f5c518";
      case "Platina":
        return "#00e5ff";
      default:
        return "#ffffff";
    }

  };

  const rarityColor = getRarityColor(car.rarity);
  const nextRarityColor = getRarityColor(nextCar.rarity);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const rotateSlide = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  const frontOpacity = slideAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 0.75, 0],
  });

  const backScale = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1],
  });

  const backTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  const backOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.9],
  });

  const glowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 22],
  });

  const nextCard = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cars.length);
      slideAnim.setValue(0);
      setIsAnimating(false);
    }, 280);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text variant="headlineLarge" style={styles.gameTitle}>
          🏎️ Super Trunfo
        </Text>

        <Text variant="labelLarge" style={styles.gameSubtitle}>
          Carros Antigos Brasileiros
        </Text>

        <View style={styles.deckArea}>
          <Animated.View
            style={[
              styles.cardWrapper,
              styles.backCard,
              {
                borderColor: nextRarityColor,
                shadowColor: nextRarityColor,
                shadowOpacity: glowOpacity,
                shadowRadius: glowRadius,
                elevation: 8,
                opacity: backOpacity,
                transform: [
                  { scale: backScale },
                  { translateY: backTranslateY },
                ],
              },
            ]}
          >
            <Card style={[styles.card, { borderColor: nextRarityColor }]}>
              <View style={styles.cardInner}>
                <Card.Cover source={nextCar.image} style={styles.cardImage} />

                <Card.Title
                  title={nextCar.name}
                  titleStyle={styles.cardName}
                  titleVariant="headlineSmall"
                />
              </View>
            </Card>
          </Animated.View>

          <Animated.View
            style={[
              styles.cardWrapper,
              {
                borderColor: rarityColor,
                shadowColor: rarityColor,
                shadowOpacity: glowOpacity,
                shadowRadius: glowRadius,
                elevation: 12,
                opacity: frontOpacity,
                transform: [
                  { translateX },
                  { rotate: rotateSlide },
                ],
              },
            ]}
          >
            <Card style={[styles.card, { borderColor: rarityColor }]}>
              <View style={styles.cardInner}>
                <Card.Cover source={car.image} style={styles.cardImage} />

                <Card.Title
                  title={car.name}
                  titleStyle={styles.cardName}
                  titleVariant="headlineSmall"
                />

                <Card.Content>
                  <Text style={[styles.rarityText, { color: rarityColor }]}>
                    Carta {car.rarity}
                  </Text>

                  <View style={styles.chipsRow}>
                    <Chip style={styles.chip} textStyle={styles.chipText}>
                      {car.brand}
                    </Chip>

                    <Chip style={styles.chip} textStyle={styles.chipText}>
                      {car.year}
                    </Chip>

                    <Chip style={styles.chip} textStyle={styles.chipText}>
                      {car.origin}
                    </Chip>
                  </View>

                  <Divider style={styles.divider} />

                  <Text variant="bodyMedium" style={styles.description}>
                    {car.description}
                  </Text>

                  <Divider style={styles.divider} />

                  <Text style={styles.stars}>
                    {"⭐".repeat(car.stars)}
                  </Text>
                </Card.Content>
              </View>
            </Card>
          </Animated.View>
        </View>

        <Button
          mode="contained"
          onPress={nextCard}
          disabled={isAnimating}
          style={styles.nextButton}
        >
          Próxima carta
        </Button>
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

  deckArea: {
    width: "100%",
    maxWidth: 380,
    height: 560,
    alignItems: "center",
    justifyContent: "center",
  },

  cardWrapper: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 24,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
  },

  backCard: {
    position: "absolute",
  },

  card: {
    width: "100%",
    backgroundColor: "#16213e",
    borderRadius: 22,
    borderWidth: 2,
  },

  cardInner: {
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#16213e",
  },

  cardImage: {
    height: 220,
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

  stars: {
    fontSize: 20,
    textAlign: "center",
  },

  rarityText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  nextButton: {
    marginTop: 20,
    backgroundColor: "#f5c518",
    borderRadius: 30,
  },
});