import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error loading cart from AsyncStorage:", error);
      Alert.alert("Error", "Failed to load cart from AsyncStorage.");
    }
  };

  const updateCart = async (updatedCart) => {
    setCart(updatedCart);
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving cart to AsyncStorage:", error);
      Alert.alert("Error", "Failed to save cart to AsyncStorage.");
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    updateCart(updatedCart);
  };

  const updateQuantity = (product, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === product.id) {
          const newQuantity = (item.quantity || 1) + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/back.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.businessName}>CHECKOUT</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Search.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => updateQuantity(item, -1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity || 1}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item, 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item)}
            >
              <Image
                source={require("../assets/images/remove.png")}
                style={styles.removeButtonIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => Alert.alert("Checkout", "Proceeding to checkout...")}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  businessName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  product: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#ff0000",
    marginVertical: 10,
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonIcon: {
    width: 24,
    height: 24,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: "#000",
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
