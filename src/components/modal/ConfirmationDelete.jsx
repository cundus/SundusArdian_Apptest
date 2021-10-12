import { AlertDialog, Button, useToast } from "native-base";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { API } from "../../config/API";
import { AppContext } from "../../context/AppContext";

const ConfirmationDelete = (props) => {
  const { isOpen, onClose, cancelRef, id, name, navigation } = props;
  console.log(props);

  const toast = useToast();

  const { dispatch } = useContext(AppContext);
  const handleDelete = async () => {
    try {
      await API.delete(`/contact/${id}`);

      dispatch({
        type: "UPDATE",
      });

      toast.show({
        title: "Contact Deleted",
        status: "warning",
        placement: "top",
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Delete Contact</AlertDialog.Header>
        <AlertDialog.Body>
          <Text>This will remove all data relating to {name}.</Text>
          <Text>
            This action cannot be reversed. Deleted data can not be recovered.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={handleDelete}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ConfirmationDelete;
