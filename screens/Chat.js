// @refresh reset
import { useRoute } from "@react-navigation/native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import { GiftedChat } from "react-native-gifted-chat";
import { pickImage, uploadImage } from "../utils";
import ImageView from "react-native-image-viewing";
import { t } from "../lang";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  query,
  where,
} from "@firebase/firestore";
import {
  ChatBackground,
  ChatBox,
  CamerIconBox,
  CamerIcon,
  SendButton,
  SendIcon,
  MessgaeInput,
  BubbleBox,
  ImageBorder,
  Image,
} from "./Chat.styles";

const randomId = nanoid();

export default function Chat() {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
  const [userBPushToken, setUserBPushToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState("");

  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomId = room ? room.id : randomId;
  const roomRef = doc(db, "rooms", roomId);
  const roomMessagesRef = collection(db, "rooms", roomId, "messages");

  // If there is no room, create it.
  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };

        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }

        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: userB.email,
        };

        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }

        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };

        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }

      // Security
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);

      // Sends iamge from menu camera
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, emailHash);
      }
    })();
  }, []);

  // Get userB data to set expo push token
  useEffect(() => {
    const q = query(collection(db, "users"), where("email", "==", userB.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUserBPushToken(userDoc.expoPushToken);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      // Give access only when doc changes, it will stop replace everything every time.
      // Filter those changes and change only for 'type' added
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data(); // access data from document
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); //  displays messages in order of sending
      appendMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, []);

  // Append new messages to component
  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  // On send update last message
  async function onSend(messages = []) {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  }

  async function sendImage(uri, roomPath) {
    // Upload image
    const { url, fileName } = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );

    const message = {
      _id: fileName,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };

    // Send message with photo and upload last message.
    const lastMessage = { ...message, text: "Image" };
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  }

  // Allow to pick an image and if it is not cancelled send image.
  async function handlePhotoPicker() {
    const result = await pickImage();
    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  }

  // Sends push notification
  async function sendPushNotification(expoPushToken, text) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: userB.displayName,
      body: text,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  return (
    <ChatBackground resizeMode="cover" source={require("../assets/chatbg.png")}>
      <ChatBox
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        renderInputToolbar={(props) => (
          <MessgaeInput {...props} placeholder={t("Type a message")} />
        )}
        renderBubble={(props) => <BubbleBox {...props} />}
        renderActions={(props) => (
          <CamerIconBox
            {...props}
            onPressActionButton={handlePhotoPicker}
            icon={() => <CamerIcon />}
          />
        )}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props;

          return (
            <SendButton
              onPress={async () => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIdGenerator(),
                    },
                    true
                  );
                }
                await sendPushNotification(userBPushToken, text);
              }}
            >
              <SendIcon />
            </SendButton>
          );
        }}
        renderMessageImage={(props) => {
          return (
            <ImageBorder>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setSeletedImageView(props.currentMessage.image);
                }}
              >
                <Image source={{ uri: props.currentMessage.image }} />
                {selectedImageView ? (
                  <ImageView
                    imageIndex={0}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    images={[{ uri: selectedImageView }]}
                  />
                ) : null}
              </TouchableOpacity>
            </ImageBorder>
          );
        }}
      />
    </ChatBackground>
  );
}
