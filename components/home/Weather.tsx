import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import Search from "../search/Search";
import { fetchLocationId, fetchWeather } from "../../utils/api";
import getImageForWeather from "../../utils/GetImageForWeather";

class Weather extends Component {
  state = {
    loading: false,
    error: false,
    location: "",
    temperature: 0,
    weather: ""
  };
  handleUpdateLocation = async (city: string) => {
    if (!city) return;
    this.setState(
      {
        loading: true
      },
      async () => {
        try {
          const locationId = await fetchLocationId(city);
          const { location, weather, temperature } = await fetchWeather(
            locationId
          );
          this.setState({
            loading: false,
            error: false,
            location,
            weather,
            temperature
          });
        } catch (error) {
          this.setState({
            loading: false,
            error: true
          });
        }
      }
    );
  };
  componentDidMount() {
    this.handleUpdateLocation("Dhaka");
  }
  render() {
    const { location, weather, temperature, loading, error } = this.state;
    return (
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}
            </View>
          )}

          <Search
            placeholder="Search any city"
            onSubmit={this.handleUpdateLocation}
          />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    paddingTop: 20
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});

export default Weather;
