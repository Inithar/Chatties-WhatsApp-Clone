import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import GlobalContext from "../context/Context";
import { db } from "../firebase";
import useContacts from "../hooks/useHooks";
import styled from "styled-components/native";

const ContactsContainer = styled.FlatList`
  flex: 1;
  padding: ${(props) => props.theme.space[2]};
`;

export default function Contacts() {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params && route.params.image;

  return (
    <ContactsContainer
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
  );
}

function ContactPreview({ contact, image }) {
  const { unfilteredRooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);

  // Fetch for contact information in database. If contact is already signed up, merge information from document and information from the contact.
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", contact.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ListItem
      type="contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
  );
}
