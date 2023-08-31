import React from "react";
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FiltersScreen from '../screens/FiltersScreen'
import FavoritesScreen from '../screens/FavoritesScreen'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Meals = createNativeStackNavigator()
const Fav = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Filter = createNativeStackNavigator()

function MealsNavigator() {
  return (
    <Meals.Navigator
      initialRouteName="Categories"
      screenOptions={styles.screen}
    >
      <Meals.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meal Categories',
        }}
      />
      <Meals.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => ({
          title: route.params.categoryTitle,
        })}
      />
      <Meals.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.mealDetails.title,
        })}
      />
    </Meals.Navigator>
  )
}

function FavNavigator() {
  return (
    <Fav.Navigator
      initialRouteName="Fav"
      screenOptions={{
        ...styles.screen,
        title: 'Your Favorites',
      }}
    >
      <Fav.Screen name="Fav" component={FavoritesScreen} />
      <Fav.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.mealDetails.title,
        })}
      />
    </Fav.Navigator>
  )
}

function MealsFavTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Meals"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange'
      }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-star" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function FiltersNavigator() {
  return (
    <Filter.Navigator initialRouteName="Filters" screenOptions={styles.screen}>
      <Filter.Screen name="Filters" component={FiltersScreen} options={{
        title: 'Filter Meals'
      }} ></Filter.Screen>
    </Filter.Navigator>
  )
}

function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MealsFav"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'orange',
        drawerActiveTintColor: 'white'
      }}
    >
      <Drawer.Screen
        name="MealsFav"
        component={MealsFavTabNavigator}
        options={{
          title: 'Meals',
        }}
      />
      <Drawer.Screen
        name="FiltersNav"
        component={FiltersNavigator}
        options={{
          title: 'Filters',
        }}
      />
    </Drawer.Navigator>
  )
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <MainNavigator />
      <StatusBar style='light' />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    headerStyle: { backgroundColor: '#4a148c' },
    headerTintColor: 'white',
  },
})
