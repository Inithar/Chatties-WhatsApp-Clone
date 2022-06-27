import React from "react";
import styled from "styled-components/native";

const AvatarImage = styled.Image.attrs({
  resizeMode: "cover",
})`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
`;

export default function Avatar({ size, user }) {
  return (
    <AvatarImage
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require("../assets/icon-square.png")
      }
      size={size}
    />
  );
}
