import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      offWhite: "#FAF9F6",
      beige: "#E6DFD4",
      softGold: "#D4AF37",
      roseGold: "#B76E79",
      darkText: "#2C2C2C",
    },
  },
  fonts: {
    heading: "var(--font-inter), sans-serif",
    body: "var(--font-inter), sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "brand.offWhite",
        color: "brand.darkText",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.softGold",
          color: "white",
          _hover: {
            bg: "brand.roseGold",
          },
        },
        outline: {
          borderColor: "brand.softGold",
          color: "brand.softGold",
          _hover: {
            bg: "brand.beige",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
  },
});

export default theme;
