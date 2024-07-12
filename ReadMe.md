rn-assignment7-11297426

This is a React Native application that allows users to view a list of available products, preview detail information about a product, add products to their cart, remove products from their cart, and view the items in their cart.

Design Choices

I used a FlatList component to render the product list and cart items, as it provides a efficient way to render large lists of data.
I used AsyncStorage to store the cart items locally on the device, as it provides a simple way to store and retrieve data.
I used axios to fetch data from the external API, as it provides a simple way to make HTTP requests.
I used react-navigation to navigate between screens, as it provides a simple way to manage navigation in React Native applications.

Implementation

The HomeScreen component fetches the product list from the external API and renders it using a FlatList component.
The ProductDetailScreen component fetches the product details from the external API and renders it using a ScrollView component.
The CartScreen component fetches the cart items from Local Storage and renders it using a FlatList component.
The Drawer component provides a navigation menu that allows users to navigate between screens.
The AppNavigator component manages the navigation between screen

Here are some screenshots of the application:

![WhatsApp Image 2024-07-12 at 09 01 53_391430f2](https://github.com/user-attachments/assets/62b9bfa9-737a-4686-a2e2-a8738d35a3ca)

![WhatsApp Image 2024-07-12 at 09 01 52_d76edc3e](https://github.com/user-attachments/assets/b9e8be2c-abea-409c-88ff-89417d785e89)

![WhatsApp Image 2024-07-12 at 09 01 52_41dc7ebc](https://github.com/user-attachments/assets/bd4b69c6-c423-40d0-83fd-c24082fc5558)

How to Run

Clone the repository to your local machine.

Run npm install to install the dependencies.

Run npx react-native start to start the development server.

Run npx react-native run-android or npx react-native run-ios to run the application on an emulator or physical device.


