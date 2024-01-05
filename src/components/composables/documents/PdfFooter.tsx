import { Page, Text, Document, StyleSheet, PDFViewer, View, Image, Font } from "@react-pdf/renderer";
import GSCWDLogo from "../../../../public/images/document/gscwd_logo.png";
import IsoAccreditorLogo from "../../../../public/images/document/socotec-logo.jpg";
import { FunctionComponent } from "react";
import { isEmpty } from "lodash";

// const ArialRegular = localFont({ src: [{ path: "../../../../public/fonts/uploads/arialregular.ttf", weight: "400" }] });
// const ArialSemiBold = localFont({
//   src: [{ path: "../../../../public/fonts/uploads/arialsemibold.ttf", weight: "600" }],
// });

// const newArial = localFont({
//   src: [
//     { path: "../../../../public/fonts/uploads/arialMT.woff2", weight: "400", style: "normal" },
//     { path: "../../../../public/fonts/uploads/arialMTBold.woff2", weight: "600", style: "normal" },
//   ],
//   variable: '--font-newArial'
// });

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  footer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: "center",
  },

  gscwdLogo: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  isoLogo: { width: 71, height: 46, margin: "auto" },

  // Border Styles
  bodyBorder: {
    margin: 10,
    border: "2px solid #000000",
  },
  borderTop: {
    borderTop: "1px solid #000000",
  },
  borderRight: {
    borderRight: "1px solid #000000",
  },

  // Field Styles
  headerText: {
    fontFamily: "ArialRegular",
    fontSize: 9,
    padding: 1,
    marginVertical: "auto",
  },
  documentCode: {
    // fontFamily: CalibriRegular.style.fontFamily,
    fontSize: 11,
    padding: "10 15 0 0",
    textAlign: "right",
    backgroundColor: "#DC143C",
  },
  arialSemiBold: {
    fontFamily: "ArialSemiBold",
    color: "#127abb",
  },
  website: {
    fontFamily: "ArialItalic",
    color: "#126eb9",
  },
  verticalCenter: { margin: "auto 0" },
  horizontalCenter: { textAlign: "center" },

  // Width Styles
  w100: { width: "100%" },
  w60: { width: "60%" },
  w40: { width: "40%" },
  w30: { width: "30%" },
  w20: { width: "20%" },
});

Font.register({
  family: "ArialRegular",
  src: "/fonts/arialregular.ttf",
});

Font.register({
  family: "ArialSemiBold",
  src: "/fonts/arialsemibold.ttf",
});

Font.register({
  family: "ArialItalic",
  src: "/fonts/arialitalic.ttf",
});

const PdfFooter: FunctionComponent = () => {
  return (
    <>
      {/* HEADER */}
      <View style={[styles.footer]}>
        <Text style={{ fontFamily: "Times-Italic", color: "#026fbd", fontSize: "12", textAlign: "center" }}>
          Safe Water... Our Thrust, Our Service, Our Commitment.
        </Text>
      </View>
    </>
  );
};
export default PdfFooter;
