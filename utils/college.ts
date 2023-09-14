// import _ from "lodash";
// import { CollegeDepartment } from "@prisma/client";

// // 대학 학과의 표 데이터를 스키마에 맞게 파싱한다.
// export const getCollegeDepartmentData = (data: any) => {
//   const parseData = _.chain(data)
//     .groupBy("departmentName")
//     .map((test, key) => {
//       let collegeEarly: any = [];
//       let collegeRegular: any = [];
//       test.map(item => {
//         switch (item.type) {
//           case 1:
//             collegeEarly.push({
//               type: item.earlyType,
//               name: item.name,
//               amount: item.amount,
//               rate: item.rate,
//               satLimit: item.earlySatLimit,
//               method: item.method,
//             });
//             break;
//           case 2:
//             collegeRegular.push({
//               name: item.name,
//               amount: item.amount,
//               rate: item.rate,
//               satUnit: item.regularSatUnit,
//               method: item.method,
//               reflection: item.regularReflection,
//             });
//             break;
//           default:
//             break;
//         }
//       });
//       return { name: key, collegeEarly, collegeRegular };
//     })
//     .value();
//   return parseData;
// };

// // 데이터를 표 데이터로 파싱한다.
// export const setCollegeDepartmentData = (data: any) => {
//   let parseData = data.map(department => [
//     department.collegeEarly.map(collegeEarly => ({
//       departmentName: department.name,
//       type: 1,
//       name: collegeEarly.name,
//       amount: collegeEarly.amount,
//       rate: collegeEarly.rate,
//       method: collegeEarly.method,
//       earlyType: collegeEarly.type,
//       earlySatLimit: collegeEarly.satLimit,
//       regularSatUnit: "",
//       regularReflection: "",
//     })),
//     department.collegeRegular.map(collegeRegular => ({
//       departmentName: department.name,
//       type: 2,
//       name: collegeRegular.name,
//       amount: collegeRegular.amount,
//       rate: collegeRegular.rate,
//       method: collegeRegular.method,
//       earlyType: "",
//       earlySatLimit: "",
//       regularSatUnit: collegeRegular.satUnit,
//       regularReflection: collegeRegular.reflection,
//     })),
//   ]);
//   const flattenData = _.flattenDeep(parseData);
//   const getIdData = flattenData.map((data, id) => ({ id: id + 1, ...data }));
//   // _.flattenDeep(parseData);
//   // const setIdData = _.flatten(parseData, true).map((data, id) => ({
//   //   id: id,
//   //   ...data,
//   // }));
//   return getIdData;
// };
