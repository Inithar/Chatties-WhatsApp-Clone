import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/Context";
import { auth, db } from "../firebase";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import ListItem from "../components/ListItem";
import useContacts from "../hooks/useHooks";
import styled from "styled-components/native";

const ChatsContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[1]};
  padding-right: ${(props) => props.theme.space[2]};
`;

export default function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();

  // Query that returns the rooms of the current user
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      // Array of objects, each object contains the room data, its id and the data of the other user of the room
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));

      setUnfilteredRooms(parsedChats);

      // Set room only if there is a message in this room
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });

    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    // Displays the name stored in the contact instead of the name selected by the other user
    if (userContact && userContact.contactName) {
      return {
        ...user,
        contactName: userContact.contactName,
      };
    }

    return user;
  }

  return (
    <ChatsContainer>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <ContactsFloatingIcon />
    </ChatsContainer>
  );
}
