import { Page, Text, Document, StyleSheet, PDFViewer, View, Image, Font } from "@react-pdf/renderer";
import GSCWDLogo from "../../../../../public/images/document/gscwd_logo.png";
import dayjs from "dayjs";
import { FunctionComponent } from "react";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
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
  w40: { width: "40%" },
  w30: { width: "30%" },
});

type ApprovedTrainingPdfProps = {
  courseTitle: string;
};

const ApprovedTrainingPdf: FunctionComponent<ApprovedTrainingPdfProps> = ({ courseTitle }) => {
  return (
    <>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={[styles.rowContainer]}>
          <Text style={{ fontSize: 10, paddingRight: 15 }}>FOR</Text>
          <Text style={{ fontSize: 10, paddingRight: 15 }}>:</Text>
          <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>FERDINAND S. FERRER, MPA</Text>
        </View>

        <View style={[styles.rowContainer]}>
          <Text style={{ fontSize: 10, paddingLeft: 53, paddingTop: 3 }}>Acting General Manager</Text>
        </View>

        <View style={[styles.rowContainer, { paddingTop: 3 }]}>
          <Text style={{ fontSize: 10, paddingRight: 7 }}>FROM</Text>
          <Text style={{ fontSize: 10, paddingRight: 15 }}>:</Text>
          <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>Personnel Development Committee</Text>
        </View>

        <View style={[styles.rowContainer, { paddingTop: 3 }]}>
          <Text style={{ fontSize: 10, paddingRight: 11 }}>DATE</Text>
          <Text style={{ fontSize: 10, paddingRight: 15 }}>:</Text>
          <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>{dayjs().format("MMMM DD, YYYY")}</Text>
        </View>

        <View style={[styles.rowContainer, { paddingTop: 3 }]}>
          <Text style={{ fontSize: 10, paddingRight: 22 }}>RE</Text>
          <Text style={{ fontSize: 10, paddingRight: 15 }}>:</Text>
          <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>{courseTitle}</Text>
        </View>

        <View style={[styles.rowContainer, { paddingTop: 5, borderBottom: "2px solid #0000" }]}></View>

        <View style={[styles.rowContainer, { paddingTop: 3 }]}>
          <Text style={{ fontSize: 10, paddingRight: 22, textAlign: "justify" }}>
            The Personnel Development Committee (PDC) upon review and evaluation of the nominees&apos; qualifications,
            hereby recommend for your approval of the following employees to attend the {courseTitle.toString()} which
            will held. Blah blah blah.
          </Text>
        </View>
      </View>
    </>
  );
};
export default ApprovedTrainingPdf;
