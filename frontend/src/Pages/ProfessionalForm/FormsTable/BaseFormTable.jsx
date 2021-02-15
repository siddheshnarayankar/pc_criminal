import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import _ from "lodash";
import { AppTable } from "../../../_components/AppTable";

 
export const BaseFormTable = (props) => {

    const [criminalData,setCriminalData] = useState([]);
    const [criminalHeaders,setCriminalHeaders] = useState([]);
    const requiredKeys = ["name", "age","address", "MobileNumber", "city", "phone"];
    useEffect(()=>{

        if(props.criminalRecords && props.criminalRecords.basicInfo){
            // setCriminalRecors(props.criminalRecords.basicInfo);
            let columns1 =
            props.criminalRecords &&
            props.criminalRecords &&
            props.criminalRecords.basicInfo.map((itemObj, index) => {
              return {
                ...itemObj,
                key: index + 1,
              };
            });

            columns1 && columns1.length && columns1.reverse();
            setCriminalData(columns1);

            let tablelabes = columns1 && columns1.length && Object.keys(columns1[0]);

            let tableColumns = [];
            tablelabes && tablelabes.length && tablelabes.forEach((item) => {
              if (
                _.filter(requiredKeys, function (o) {
                  return o === item;
                }).length
              ) {
                tableColumns.push(item);
              }
            });

            let columnList = tableColumns.map((item) => {
                return {
               title: item,
               dataIndex: item,
               key: item,
             };
           });

           setCriminalHeaders(columnList);
        }

    },[props.criminalRecords])
 
 
    const onEditAccusedForm = (data) =>{
        props.onEditAccusedForm(data)
    }  
  
  return (
    <AppTable
      isAccusedFormUpdate= {true}
      onEditAccusedForm ={onEditAccusedForm}
      data={criminalData}
      columns={criminalHeaders}
    ></AppTable>
  );
};
