"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "next/navigation";
import { JSONContent } from "@tiptap/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Tiptap } from "@lms/components/osprey/ui/tiptap/view/Tiptap";
import Image from "next/image";
import gscwd_logo from "../../../../public/images/document/gscwd_logo.png";
import iso_logo from "../../../../public/images/document/iso_logo.jpg";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { useUserDetails } from "@lms/hooks/use-userdetails";
import { Document, PDFViewer, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import Header from "./printables/Header";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    paddingTop: 10,
    paddingBottom: 25,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 5,
  },
  bodyBorder: {
    marginHorizontal: 50,
  },

  // line
  line: {
    borderBottom: "2px solid #0000",
  },

  // Table Styles
  rowContainerTable: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  tHeadFirstLevel: {
    padding: "4 0 0 4",
  },
  tHeadSecondLevel: {
    // fontFamily: 'CalibriRegularBold',
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    padding: "4 0 0 4",
    textAlign: "center",
  },
  tData: {
    padding: "4 0 0 4",
  },

  // Border Styles
  borderAll: {
    border: "1px solid #000000",
  },
  borderTop: {
    borderTop: "1px solid #000000",
  },
  borderRight: {
    borderRight: "1px solid #000000",
  },
  borderLeft: {
    borderLeft: "1px solid #000000",
  },
  borderBottom: {
    borderBottom: "1px solid #000000",
  },

  // Field Styles
  documentTitle: {
    // fontFamily: 'CalibriRegularBold',
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 10,
    textAlign: "center",
  },

  content: {
    fontFamily: "Helvetica",
    fontSize: 10,
    textAlign: "left",
    marginBottom: 10,
  },

  contentTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    textAlign: "left",
    marginBottom: 5,
  },

  headerText: {
    // fontFamily: 'CalibriRegularBold',
    fontFamily: "Helvetica-Bold",
    textDecoration: "underline",
    fontSize: 12,
    marginTop: 15,
    marginBottom: 4,
  },
  bodyText: {
    // fontFamily: 'CalibriRegular',
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  bodyTextBold: {
    // fontFamily: 'CalibriRegularBold',
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  upperCase: {
    textTransform: "uppercase",
  },
  signatoryName: {
    // fontFamily: 'CalibriRegularBold',
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    paddingTop: 3,
  },

  verticalCenter: { margin: "auto 0" },
  horizontalCenter: { textAlign: "center" },
  signature: {
    width: 100,
    marginHorizontal: "auto",
  },

  // Width Styles
  w100: { width: "100%" },
  w75: { width: "75%" },
  w70: { width: "70%" },
  w60: { width: "60%" },
  w50: { width: "50%" },
  w40: { width: "40%" },
  w33_33: { width: "33.33%" },
  w30: { width: "30%" },
  w26: { width: "26%" },
  w20: { width: "20%" },
  w16: { width: "16%" },
  w15: { width: "15%" },
  w14: { width: "14%" },
  w10: { width: "10%" },
  w5: { width: "5%" },
});

export const PrintTrainingDesign = () => {
  const trainingDesignToPrintRef = useRef(null);
  const user = useUserDetails();

  const params = useParams();
  const handlePrint = useReactToPrint({
    content: () => trainingDesignToPrintRef.current,
    documentTitle: "Training-design",
    pageStyle: "@page { size: 8.5in 13in; margin: 80px; } @media print { footer {page-break-after: always} }",
    // fonts: [{ family: "Open Sans", source: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" }],
  });

  const [trainingDesignId, setTrainingDesignId] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [rationale, setRationale] = useState<string | JSONContent | null>("");
  const [courseDescription, setCourseDescription] = useState<string | JSONContent | null>("");
  const [courseObjective, setCourseObjective] = useState<string | JSONContent | null>("");
  const [targetParticipants, setTargetParticipants] = useState<string | JSONContent | null>("");
  const [methodologies, setMethodologies] = useState<string | JSONContent | null>("");
  const [expectedOutput, setExpectedOutput] = useState<string | JSONContent | null>("");
  const [recognition, setRecognition] = useState<string | JSONContent | null>("");
  const id = params.id.toString();

  const { data: td, isLoading } = useQuery({
    queryKey: ["training-design", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/designs/${id}`);

      setTrainingDesignId(data.id);
      setCourseTitle(data.courseTitle);
      setRationale(data.rationale);
      setCourseDescription(data.courseDescription);
      setCourseObjective(data.courseObjective);
      setTargetParticipants(data.targetParticipants);
      setMethodologies(data.methodologies);
      setExpectedOutput(data.expectedOutput);
      setRecognition(data.recognition);
      return data;
    },
    enabled: !!id,
  });

  const renderRationale = () => {
    const content = td ? td.rationale : "";
    return content;
  };

  return (
    <>
      <div className="flex justify-end w-full sm:px-28 md:px-10 lg:px-6">
        <button
          onClick={handlePrint}
          className="fixed flex items-center gap-2 px-4 py-2 text-center text-white bg-gray-500 rounded-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            width="40"
            height="40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
            />
          </svg>
          <span className="text-2xl">Print / Download</span>
        </button>
      </div>

      <div className="flex justify-center w-full ">
        <div className="m-1 shadow-xl">
          <div className="w-[8.5in] px-20 py-10 bg-white text-sm">
            {!trainingDesignId ? (
              <div className="flex justify-center w-full h-full">
                <Spinner borderSize={4} size="large" />
              </div>
            ) : (
              <div ref={trainingDesignToPrintRef}>
                <header className="flex items-center w-full h-full grid-cols-3 font-serif">
                  <div className="w-[15%]">
                    <Image src={gscwd_logo} alt="gscwd logo" height={105} />
                  </div>
                  <section className="w-[70%] leading-tight -tracking-normal text-center">
                    <h3 className="font-openSans">Republic of the Philippines</h3>
                    <p className="font-semibold uppercase text-sky-600">General Santos City Water District</p>
                    <h3>E. Fernandez St., Brgy. Lagao, General Santos City</h3>
                    <h3>Telephone No. (083) 552-3824 / Telefax No. (083) 553-4960</h3>
                    <h3>E-mail Address: gscwaterdistrict@yahoo.com</h3>
                    <p className="font-medium text-blue-500 underline underline-offset-2">www.gensanwater.gov.ph</p>
                  </section>
                  <div className="w-[15%]">
                    <Image src={iso_logo} alt="iso logo" />
                  </div>
                </header>
                <hr className="my-4" />
                <div className="flex justify-center w-full font-semibold uppercase">Training Design</div>
                <div className="flex items-center font-semibold">Course Title: {courseTitle}</div>
                <div className="mt-4 font-semibold">I.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rationale</div>
                {trainingDesignId ? (
                  <Tiptap
                    id="rationale"
                    className="bg-white "
                    content={rationale}
                    setContent={setRationale}
                    type="JSON"
                    viewOnly
                    editable={false}
                  />
                ) : null}
                <div className="mt-4 font-semibold">II.&nbsp;&nbsp;&nbsp;&nbsp;Course Description</div>
                {trainingDesignId ? (
                  <Tiptap
                    id="course-desc"
                    className="bg-white "
                    content={courseDescription}
                    setContent={setCourseDescription}
                    type="JSON"
                    viewOnly
                    editable={false}
                  />
                ) : null}
                <div className="mt-4 font-semibold">III.&nbsp;&nbsp;&nbsp;Course Objectives</div>
                {trainingDesignId && (
                  <Tiptap
                    id="course-obj"
                    className="bg-white "
                    content={courseObjective}
                    setContent={setCourseObjective}
                    type="JSON"
                    viewOnly
                    editable={false}
                  />
                )}
                <div className="mt-4 font-semibold">IV.&nbsp;&nbsp;Target Participants</div>
                {trainingDesignId && (
                  <Tiptap
                    id="target-participants"
                    className="bg-white "
                    content={targetParticipants}
                    setContent={setTargetParticipants}
                    type="JSON"
                    viewOnly
                    editable={false}
                  />
                )}
                <div className="mt-4 font-semibold">V.&nbsp;&nbsp;&nbsp;Methodologies</div>
                {trainingDesignId && (
                  <Tiptap
                    id="methodologies"
                    className="bg-white "
                    content={methodologies}
                    setContent={setMethodologies}
                    type="JSON"
                    viewOnly
                    editable={false}
                  />
                )}
                <div className="mt-4 font-semibold">Expected Outputs</div>
                {trainingDesignId && (
                  <Tiptap
                    id="expected-outputs"
                    className="bg-white "
                    content={expectedOutput}
                    setContent={setExpectedOutput}
                    type="JSON"
                    viewOnly
                    editable={false}
                  />
                )}
                <div className="mt-4 font-semibold">Recognition</div>
                {trainingDesignId && (
                  <Tiptap
                    id="expected-outputs"
                    className="bg-white "
                    content={recognition}
                    setContent={setRecognition}
                    type="JSON"
                    viewOnly
                    editable={false}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center w-full h-full m-1 shadow-xl  px-20 py-10 bg-white text-sm">
        <PDFViewer width={"100%"} height={"100%"} showToolbar={false}>
          <Document>
            <Page size="A4">
              <View style={{ marginTop: "20px" }}></View>
              <Header />

              <View style={[styles.bodyBorder]}>
                <View style={[styles.line, { marginBottom: "10px" }]}></View>

                <View style={[styles.documentTitle]}>
                  <Text>TRAINING DESIGN</Text>
                </View>

                <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 10 }}>
                  Course Title: {courseTitle}
                </Text>

                <View style={[styles.contentTitle]}>
                  <Text>I. Rationale</Text>
                </View>
                <View style={[styles.content]}>
                  <Text>{td ? JSON.stringify(td.rationale) : ""}</Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div> */}
    </>
  );
};
