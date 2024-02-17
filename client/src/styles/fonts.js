import { css } from "styled-components";
import SCDream2 from "../fonts/SCDream2.otf";
import SCDream3 from "../fonts/SCDream3.otf";
import SCDream4 from "../fonts/SCDream4.otf";
import SCDream5 from "../fonts/SCDream5.otf";
import SCDream6 from "../fonts/SCDream6.otf";
import SCDream7 from "../fonts/SCDream7.otf";
import SCDream8 from "../fonts/SCDream8.otf";
import SCDream9 from "../fonts/SCDream9.otf";

export const fonts = css`
  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: 200;
    src: url(${SCDream2}) format("opentype");
  }

  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: normal;
    src: url(${SCDream3}) format("opentype");
  }

  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: 400;
    src: url(${SCDream4}) format("opentype");
  }

  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: 500;
    src: url(${SCDream5}) format("opentype");
  }

  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: 600;
    src: url(${SCDream6}) format("opentype");
  }

  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: 700;
    src: url(${SCDream7}) format("opentype");
  }

  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: 800;
    src: url(${SCDream8}) format("opentype");
  }

  @font-face {
    font-family: "SCDream";
    src: local("SCDream"), local("SCDream");
    font-weight: 900;
    src: url(${SCDream9}) format("opentype");
  }
`;
