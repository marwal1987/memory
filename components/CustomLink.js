import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function CustomLink(props) {
  const { href, children, textColor, bgColor, rounded, py, px, width } = props;
  const styles = StyleSheet.create({
    linkContainer: {
      overflow: "hidden",
      borderRadius: rounded,
      backgroundColor: bgColor,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: py || 12,
      paddingHorizontal: px || 24,
      minWidth: width,
      elevation: 5,
    },
    text: {
      fontSize: 16,
      letterSpacing: 1,
      fontWeight: "bold",
      color: textColor,
      textAlign: "center",
    },
  });

  return (
    <Pressable style={styles.linkContainer}>
      <Link href={href} asChild >
        <Text style={styles.text}>{children}</Text>
      </Link>
    </Pressable>
  );
}
