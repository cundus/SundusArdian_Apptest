import {
  Box,
  Text,
  Fab,
  Icon,
  Button,
  Center,
  HStack,
  Spinner,
  Heading,
} from "native-base";
import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import Cards from "../components/Cards";
import { API } from "../config/API";
import { AppContext } from "../context/AppContext";
import { AntDesign } from "@expo/vector-icons";
import ModalAdd from "../components/modal/ModalAdd";

const Home = ({ navigation }) => {
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const { state, dispatch } = useContext(AppContext);

  //   console.log(contacts);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/contact");
      //   console.log(response.data);
      setContacts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
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
      position="relative"
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <Cards data={contacts} isLoading={isLoading} navigation={navigation} />
      <Button
        position="absolute"
        bg="blue.600"
        borderRadius="50"
        p={2}
        w="12"
        h="12"
        bottom="5"
        right="8"
        onPress={() => setShowModal(true)}
      >
        <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
      </Button>
      <ModalAdd showModal={showModal} setShowModal={setShowModal} />
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
