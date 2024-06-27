import Papa from "papaparse";
import csvFilePath from "./csv/do_si_gu.csv";

export const parseCSV = () => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      encoding: "UTF-8",
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const transformLocationData = (data) => {
  const locationData = {};

  data.forEach((item) => {
    const { doName, siName, guName } = item;

    if (!locationData[doName]) {
      locationData[doName] = {};
    }

    if (siName && !locationData[doName][siName]) {
      locationData[doName][siName] = [];
    }

    if (guName) {
      locationData[doName][siName].push(guName);
    }
  });
  return locationData;
};

export const getDoList = (data) => {
  return Object.keys(data);
};

export const getSiList = (data, selectedDo) => {
  return Object.keys(data[selectedDo] || {});
};

export const getGuList = (data, selectedDo, selectedSi) => {
  return data[selectedDo]?.[selectedSi] || [];
};
