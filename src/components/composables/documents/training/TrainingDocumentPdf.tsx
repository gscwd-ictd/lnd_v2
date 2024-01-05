import { Page, Text, Document, StyleSheet, PDFViewer, View, Image, Font } from "@react-pdf/renderer";
import defaultSignature from "../../../../../public/images/document/default-signature.jpeg";
import dayjs from "dayjs";
import { FunctionComponent } from "react";
import { isEmpty } from "lodash";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  allBorders: {
    border: "1px solid #000000",
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
  signature: {
    width: 40,
    height: 60,
    margin: "auto",
  },

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
  w80: { width: "80%" },
  w70: { width: "70%" },
  w40: { width: "40%" },
  w30: { width: "30%" },
  w20: { width: "20%" },
});

Font.registerHyphenationCallback((word) => {
  return [word];
});

type ApprovedTrainingPdfProps = {
  // courseTitle: string;
  data: {
    courseTitle: string;
    from: string;
    to: string;
    location: string;
    preparedBy: { name: string; signatureUrl?: string; position: string };
    notedBy: { name: string; signatureUrl?: string; position: string };
    isApproved: boolean;
  };
};

const TrainingDocumentPdf: FunctionComponent<ApprovedTrainingPdfProps> = ({ data }) => {
  return (
    <>
      <View>
        <View style={[styles.rowContainer]}>
          <Text style={{ fontSize: 10, paddingRight: 15 }}>FOR</Text>
          <Text style={{ fontSize: 10, paddingRight: 15 }}>:</Text>
          <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>{data.notedBy.name.toUpperCase()}</Text>
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
          <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>{data.courseTitle}</Text>
        </View>

        <View style={[styles.rowContainer, { paddingTop: 5, borderBottom: "2px solid #0000" }]}></View>

        <View style={[styles.rowContainer, { paddingTop: 5 }]}>
          <Text style={{ fontSize: 10, textAlign: "justify", fontFamily: "Helvetica", lineHeight: 1.5 }}>
            The Personnel Development Committee (PDC) upon review and evaluation of the nominees&apos; qualifications,
            hereby recommend for your approval of the following employees to attend the{" "}
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.courseTitle.toString()}</Text> which will be held on{" "}
            {dayjs(data.from).isSame(dayjs(data.to), "day") === true
              ? dayjs(data.from).format("MMMM D, YYYY")
              : dayjs(data.from).format("MMMM D")}{" "}
            {dayjs(data.from).isSame(dayjs(data.to), "day") === true ? "" : `-${dayjs(data.to).format("D, YYYY")}`}{" "}
            {data.location.toLowerCase() === "online" ? "and would take place via online" : `at ${data.location}`}.
            Please see attached list.
          </Text>
        </View>

        {/* PREPARED AND NOTED BY */}
        <View style={[styles.rowContainer, { paddingTop: 75, paddingBottom: 25 }]}>
          <View style={[styles.w40]}>
            <Text style={{ fontSize: 10 }}>Prepared by:</Text>
          </View>
          <View style={[styles.w20]}>
            <Text style={{ fontSize: 10 }}></Text>
          </View>
          <View style={[styles.w40]}>
            <Text style={{ fontSize: 10 }}>Noted by:</Text>
          </View>
        </View>

        {/* APPROVED */}
        <View style={[styles.rowContainer]}>
          <View style={[styles.w40]}></View>
          <View style={[styles.w20]}></View>
          <View style={[styles.w40, styles.rowContainer]}>
            <View style={[styles.w20]}>
              <View style={[styles.allBorders]}>
                {data.isApproved ? (
                  <View style={[styles.allBorders]}>
                    <Text style={{ zIndex: 100, textAlign: "center", fontSize: 8 }}>X</Text>
                  </View>
                ) : (
                  <View style={[styles.allBorders, { height: 10 }]}></View>
                )}
              </View>
            </View>
            <View style={[styles.w80]}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica" }}> APPROVED</Text>
            </View>
          </View>
        </View>

        {/* DISAPPROVED */}
        <View style={[styles.rowContainer]}>
          <View style={[styles.w40]}></View>
          <View style={[styles.w20]}></View>
          <View style={[styles.w40, styles.rowContainer]}>
            <View style={[styles.w20]}>
              {data.isApproved ? (
                <View style={[styles.allBorders, { height: 10 }]}></View>
              ) : (
                <View style={[styles.allBorders]}>
                  <Text style={{ zIndex: 100, textAlign: "center", fontSize: 8 }}>X</Text>
                </View>
              )}
            </View>
            <View style={[styles.w80]}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica" }}> DISAPPROVED</Text>
            </View>
          </View>
        </View>

        {/* SIGNATURES */}
        <View style={[styles.rowContainer]}>
          <View style={[styles.w40]}>
            <Image
              src={!isEmpty(data.preparedBy.signatureUrl) ? data.preparedBy.signatureUrl : defaultSignature.src}
              style={[styles.signature]}
            />
          </View>
          <View style={[styles.w20]}>
            <Text style={{ fontSize: 10 }}></Text>
          </View>
          <View style={[styles.w40]}>
            <Image
              src={!isEmpty(data.notedBy.signatureUrl) ? data.notedBy.signatureUrl : defaultSignature.src}
              style={[styles.signature]}
            />
          </View>
        </View>

        {/* NAME */}
        <View style={[styles.rowContainer]}>
          <View style={[styles.w40]}>
            <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>{data.preparedBy.name}</Text>
          </View>
          <View style={[styles.w20]}></View>
          <View style={[styles.w40]}>
            <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>{data.notedBy.name}</Text>
          </View>
        </View>

        {/* Position */}
        <View style={[styles.rowContainer]}>
          <View style={[styles.w40]}>
            <Text style={{ fontSize: 10, fontFamily: "Helvetica", width: "100%" }}>{data.preparedBy.position}</Text>
          </View>
          <View style={[styles.w20]}></View>
          <View style={[styles.w40]}>
            <Text style={{ fontSize: 10, fontFamily: "Helvetica", width: "100%" }}>{data.notedBy.position}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default TrainingDocumentPdf;
