import {
  Box,
  Center,
  Heading,
  HStack,
  InfoIcon,
  Spinner,
  Stack,
  Text,
} from "native-base";
import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import Cards from "../components/Cards";
import { API } from "../config/API";
import { AppContext } from "../context/AppContext";

const Favorite = ({ navigation }) => {
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { state, dispatch } = useContext(AppContext);

  //   console.log(contacts);

  const fetchData = async () => {
    setContacts(state.favorite);
  };

  useEffect(() => {
    fetchData();
  }, [state.update]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <HStack space={2} alignItems="center" justify="center">
          <Spinner accessibilityLabel="Loading posts" color="blue.500" />
          <Heading color="blue.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <Box
      flex="1"
      bgColor="gray.200"
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      {contacts.length > 0 ? (
        <Cards data={contacts} isLoading={isLoading} navigation={navigation} />
      ) : (
        <Box justifyContent="center" alignItems="center" mt={40}>
          <InfoIcon size={50} color="blue.400" />
          <Text fontSize={30} mt={5}>
            You haven't favorited a contact
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
