import {
  Box,
  HStack,
  Text,
  VStack,
  Image as NBImage,
  Button,
  Icon,
  Stack,
  Spinner,
  Heading,
  Center,
  useToast,
} from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { Image, TouchableOpacity } from "react-native";
import ProfilePlaceholder from "../assets/profile.png";
import { Ionicons } from "@expo/vector-icons";
import ModalEdit from "../components/modal/ModalEdit";
import { API } from "../config/API";
import { AppContext } from "../context/AppContext";
import ConfirmationDelete from "../components/modal/ConfirmationDelete";

const Detail = (props) => {
  const id = props.route.params.id;
  //   console.log("Detail Props", props);
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/contact/" + id);
      //   console.log(response.data);
      setData(response.data.data);

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
    <Stack>
      <VStack alignItems="center" py={10}>
        <NBImage
          source={{
            uri:
              data?.photo === "N/A"
                ? Image.resolveAssetSource(ProfilePlaceholder).uri
                : data?.photo,
          }}
          alt="ProfileImage"
          size="xl"
          rounded={60}
        />

        <Text fontSize="3xl" fontWeight="bold">
          {data.firstName + " " + data.lastName}
        </Text>

        <Text fontSize="xl" fontWeight="hairline">
          Age : {data.age} yo
        </Text>
        <HStack justifyContent="center" alignItems="center" space={10} mt={10}>
          <Button
            leftIcon={
              <Ionicons
                name="trash"
                size={20}
                color="red"
                style={{ alignSelf: "center" }}
              />
            }
            variant="ghost"
            colorScheme="light"
            onPress={() => setIsOpen(true)}
          >
            <Text color="red.400">Delete</Text>
          </Button>
          <Button
            onPress={() => setShowModal(true)}
            leftIcon={
              <Ionicons
                name="create"
                size={20}
                color="blue"
                style={{ alignSelf: "center" }}
              />
            }
            variant="ghost"
            colorScheme="light"
          >
            <Text color="blue.700">Edit</Text>
          </Button>
        </HStack>
      </VStack>
      <ModalEdit
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
      />
      <ConfirmationDelete
        id={data.id}
        isOpen={isOpen}
        navigation={props.navigation}
        onClose={onClose}
        name={data.firstName}
      />
    </Stack>
  );
};

export default Detail;
