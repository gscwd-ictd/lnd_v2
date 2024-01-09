import { Batch } from "@lms/utilities/stores/training-notice-store";
import { Text, StyleSheet, View, Font } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { FunctionComponent, useEffect, useState } from "react";

type TrainingNomineesDocumentProps = {
  details: {
    batches: Batch[];
    courseTitle: string;
  };
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  allBorders: {
    border: "1px solid  #000000",
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
  w95: { width: "95%" },
  w92: { width: "92%" },
  w90: { width: "90%" },
  w80: { width: "80%" },
  w70: { width: "70%" },
  w50: { width: "50%" },
  w40: { width: "40%" },
  w30: { width: "30%" },
  w20: { width: "20%" },
  w10: { width: "10%" },
  w8: { width: "8%" },
  w5: { width: "5%" },
});

Font.registerHyphenationCallback((word) => {
  return [word];
});

const TrainingNomineesDocument: FunctionComponent<TrainingNomineesDocumentProps> = ({ details }) => {
  const [leftBatch, setLeftBatch] = useState<number>(0);
  const [rightBatch, setRightBatch] = useState<number>(0);
  const [acc, setAcc] = useState<number>(0); // sum of all nominees/participants

  useEffect(() => {
    // setBatchCount(details.batches.length / 2);
    if (details.batches.length % 2 === 0) {
      setLeftBatch(details.batches.length / 2);
      setRightBatch(details.batches.length / 2);
    } else if (details.batches.length % 2 === 1) {
      setLeftBatch(Number((details.batches.length / 2).toFixed()));
      setRightBatch(Number((details.batches.length / 2).toFixed()) - 1);
    }

    setAcc(
      details.batches.reduce((accumulator, object) => {
        return accumulator + object.employees.length;
      }, 0)
    );
  }, [details]);

  return (
    <>
      {/* <View style={[styles.rowContainer, { paddingTop: 72, paddingHorizontal: 5 }]}> */}
      <View style={[styles.rowContainer]}>
        <Text style={[styles.w100, styles.horizontalCenter, { fontSize: 18 }]}>{details.courseTitle}</Text>
      </View>

      {/* rows */}
      <View style={[styles.w100, styles.rowContainer]}>
        {/* w50 */}
        <View style={[styles.w50]}>
          {details.batches &&
            details.batches.map((batch, batchIdx) => {
              if (batch.batchNumber % 2 === 1) {
                return (
                  <View key={batchIdx} wrap={false} style={{ paddingLeft: 24 }}>
                    <Text style={{ fontSize: 12, fontFamily: "Helvetica", paddingTop: 4 }}> Batch {batchIdx + 1}</Text>
                    <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>
                      {dayjs(batch.trainingDate.from).isSame(dayjs(batch.trainingDate.to), "day")
                        ? dayjs(batch.trainingDate.from).format("MMMM D, YYYY").toUpperCase()
                        : `${dayjs(batch.trainingDate.from).format("MMMM DD")}-${dayjs(batch.trainingDate.to).format(
                            "DD, YYYY"
                          )}`.toUpperCase()}
                    </Text>
                    {batch.employees.map((emp, empIdx) => {
                      return (
                        <View style={[styles.rowContainer]} key={empIdx}>
                          {empIdx > 0 ? (
                            <Text style={[styles.w8, { fontSize: 10, fontFamily: "Helvetica" }]}>{empIdx + 1}</Text>
                          ) : (
                            <Text style={[styles.w8, { fontSize: 10, fontFamily: "Helvetica", paddingTop: 2 }]}>
                              {empIdx + 1}
                            </Text>
                          )}
                          {empIdx > 0 ? (
                            <Text style={[styles.w92, { fontSize: 10, fontFamily: "Helvetica" }]}>
                              {emp.name.toUpperCase()}
                            </Text>
                          ) : (
                            <Text style={[styles.w92, { fontSize: 10, fontFamily: "Helvetica", paddingTop: 2 }]}>
                              {emp.name.toUpperCase()}
                            </Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                );
              }
            })}
        </View>
        {/* w50 */}
        <View style={[styles.w50]}>
          {details.batches &&
            details.batches.map((batch, batchIdx) => {
              if (batch.batchNumber % 2 === 0) {
                return (
                  <View key={batchIdx} wrap={false}>
                    <Text style={{ fontSize: 12, fontFamily: "Helvetica", paddingTop: 4 }}>
                      {" "}
                      Batch {batch.batchNumber}
                    </Text>
                    <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>
                      {dayjs(batch.trainingDate.from).isSame(dayjs(batch.trainingDate.to), "day")
                        ? dayjs(batch.trainingDate.from).format("MMMM D, YYYY").toUpperCase()
                        : `${dayjs(batch.trainingDate.from).format("MMMM DD")}-${dayjs(batch.trainingDate.to).format(
                            "DD, YYYY"
                          )}`.toUpperCase()}
                    </Text>
                    {batch.employees.map((emp, empIdx) => {
                      return (
                        <View style={[styles.rowContainer]} key={empIdx}>
                          {empIdx > 0 ? (
                            <Text style={[styles.w8, { fontSize: 10, fontFamily: "Helvetica" }]}>{empIdx + 1}</Text>
                          ) : (
                            <Text style={[styles.w8, { fontSize: 10, fontFamily: "Helvetica", paddingTop: 2 }]}>
                              {empIdx + 1}
                            </Text>
                          )}
                          {empIdx > 0 ? (
                            <Text style={[styles.w92, { fontSize: 10, fontFamily: "Helvetica" }]}>
                              {emp.name.toUpperCase()}
                            </Text>
                          ) : (
                            <Text style={[styles.w92, { fontSize: 10, fontFamily: "Helvetica", paddingTop: 2 }]}>
                              {emp.name.toUpperCase()}
                            </Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                );
              }
            })}
        </View>
      </View>
      <View>
        <Text style={{ color: "#FF0000", fontSize: 10, paddingTop: 4, paddingLeft: 24, fontFamily: "Helvetica-Bold" }}>
          Total Number of Participants: {acc}
        </Text>
      </View>
    </>
  );
};

export default TrainingNomineesDocument;
