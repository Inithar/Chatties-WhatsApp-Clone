import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  pickImage,
  askForPermission,
  uploadImage,
  registerForPushNotificationsAsync,
} from "../utils";
import { auth, db } from "../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { t } from "../lang";
import {
  Container,
  Header,
  EnterDataInfo,
  CameraIconButton,
  CameraIcon,
  SelectedImage,
  NameInput,
  ButtonBox,
  NextButton,
} from "./Profile.styles";

export default function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();

  // Immediately asks for permission, if permission is granted do not ask again.
  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  // Show this when asking for permission.
  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }

  // Show this when permission is not granted.
  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;

    // If user has selected an image, uppload it and create url that we can store.
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }

    // Define user data.
    const userData = {
      displayName,
      email: user.email,
    };

    if (photoURL) {
      userData.photoURL = photoURL;
    }

    // User token 
    const token = await registerForPushNotificationsAsync();
    
    // Update profile of the user and create new firestore document in the collection with the user data.
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), {
        ...userData,
        uid: user.uid,
        expoPushToken: token,
      }),
    ]);

    navigation.navigate("home");
  }

  // Sets the profile picture
  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <Container>
        <Header>{t("Profile Info")}</Header>

        <EnterDataInfo>
          {t("Please provide your name and an optional profile photo")}
        </EnterDataInfo>

        <CameraIconButton onPress={handleProfilePicture}>
          {!selectedImage ? (
            <CameraIcon />
          ) : (
            <SelectedImage source={{ uri: selectedImage }} />
          )}
        </CameraIconButton>

        <NameInput
          placeholder={t("Type your name")}
          value={displayName}
          onChangeText={setDisplayName}
        />

        <ButtonBox>
          <NextButton
            title={t("Next")}
            onPress={handlePress}
            disabled={!displayName}
          />
        </ButtonBox>
      </Container>
    </>
  );
}
