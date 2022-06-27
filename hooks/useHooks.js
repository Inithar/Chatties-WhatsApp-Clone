import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

// Custom hook that filter and return contacts
export default function useContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      // Request contacts permission
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        // Gets the data from contacts
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        // Set only contacts that have first name and email
        if (data.length > 0) {
          setContacts(
            data
              .filter(
                (c) =>
                  c.firstName && c.emails && c.emails[0] && c.emails[0].email
              )
              .map(mapContactToUser)
          );
        }
      }
    })();
  }, []);

  return contacts;
}

function mapContactToUser(contact) {
  return {
    contactName:
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}`
        : contact.firstName,
    email: contact.emails[0].email,
  };
}
