import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Text,
  useToast,
  WarningOutlineIcon,
} from "native-base";
import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { API } from "../../config/API";
import { AppContext } from "../../context/AppContext";

const ModalEdit = (props) => {
  const { showModal, setShowModal, data } = props;
  const { dispatch } = useContext(AppContext);
  const [isValid, setIsValid] = useState(false);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [age, setAge] = useState(data.age?.toString());
  const [photo, setPhoto] = useState(data.photo);
  const toast = useToast();
  const id = data.id;

  //   console.log(firstName);

  const handleUpdate = async () => {
    try {
      if (!firstName || !lastName || !age || !photo) {
        return setIsValid(true);
      }
      if (+age > 100) {
        return Alert.alert("Error", "Age Cannot more than 100!");
      }

      const config = {
        headers: {
          "Content-type": "aplication/json",
        },
      };
      const body = {
        firstName,
        lastName,
        age: parseInt(age),
        photo,
      };

      console.log(JSON.stringify(body));
      const response = await API.put(`/contact/${id}`, body);

      dispatch({
        type: "UPDATE",
      });

      toast.show({
        title: "Contact Updated",
        status: "success",
        placement: "top",
      });

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontSize={20} fontWeight="bold">
            Update Contact
          </Text>
        </Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={isValid}>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              onFocus={() => setIsValid(false)}
              borderColor="blue.900"
              fontSize="md"
              placeholder="Input First Name"
              onChangeText={(v) => setFirstName(v)}
              value={firstName}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              All Fields should be filled.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="3" isInvalid={isValid}>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              onFocus={() => setIsValid(false)}
              borderColor="blue.900"
              fontSize="md"
              placeholder="Input Last Name"
              onChangeText={(v) => setLastName(v)}
              value={lastName}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              All Fields should be filled.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="3" isInvalid={isValid}>
            <FormControl.Label>Age</FormControl.Label>
            <Input
              onFocus={() => setIsValid(false)}
              borderColor="blue.900"
              fontSize="md"
              placeholder="Input Age"
              onChangeText={(v) => setAge(v)}
              value={age}
              keyboardType="number-pad"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              All Fields should be filled.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="3" isInvalid={isValid}>
            <FormControl.Label>Photo</FormControl.Label>
            <Input
              onFocus={() => setIsValid(false)}
              borderColor="blue.900"
              fontSize="md"
              placeholder="Input Photo URL"
              onChangeText={(v) => setPhoto(v)}
              value={photo}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              All Fields should be filled.
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onPress={handleUpdate}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalEdit;
