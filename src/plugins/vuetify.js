import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const myThemes = {
  dark: {
    dark: true,
    colors: {
      background: "#24252A",
      surface: "#424242",
      primary: "#BB86FC",
      secondary: "#03DAC6",
      error: "#CF6679",
    },
  },
  light: {
    dark: false,
    colors: {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      primary: "#6200EE",
      secondary: "#03DAC6",
      error: "#B00020",
    },
  },
};

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: myThemes,
  },
  icons: {
    defaultSet: 'mdi',
  },
});
