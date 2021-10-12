import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Avatar,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  Spacer,
  Box,
  VStack,
} from "native-base";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProfilePlaceholder from "../assets/profile.png";
import { AppContext } from "../context/AppContext";

const Cards = (props) => {
  const { data, fetchData, isLoading, navigation } = props;
  const { state, dispatch } = useContext(AppContext);

  const DEFAULT_IMAGE = Image.resolveAssetSource(ProfilePlaceholder).uri;

  console.log(state);
  const _renderItem = ({ item }) => {
    const ProfilePic = item.photo === "N/A" ? DEFAULT_IMAGE : item.photo;
    const isFavorited = state.favorite.find((contac) => contac.id === item.id);

    const handleFavorite = (item) => {
      if (!isFavorited) {
        dispatch({
          type: "ADD_FAVORITE",
          payload: item,
        });
      } else {
        dispatch({
          type: "DELETE_FAVORITE",
          payload: item,
        });
      }
      dispatch({
        type: "UPDATE",
      });
    };

    return (
      <>
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: "gray.600",
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2"
        >
          <HStack justifyContent="space-between">
            <HStack
              space={3}
              justifyContent="space-between"
              onTouchStart={() => navigation.navigate("Detail", item)}
            >
              <Avatar
                size="48px"
                source={{
                  uri: ProfilePic,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.firstName + " " + item.lastName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Age : {item.age}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.timeStamp}
              </Text>
            </HStack>
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={32}
              color="red"
              style={{ alignSelf: "center" }}
              onPress={() => handleFavorite(item)}
            />
          </HStack>
        </Box>
      </>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isLoading}
      onRefresh={fetchData}
    />
  );
};

export default Cards;

const styles = StyleSheet.create({});
