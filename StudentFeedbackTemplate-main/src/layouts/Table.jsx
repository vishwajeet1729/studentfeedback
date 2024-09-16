import React from 'react';
import "./styles/table.css"

const Table = ({data}) => {
 /*
 // dummy data  
 const data=[
    {
        stronglyAgree:15,
        agree:12,
        stronglyDisagree:17,
        disagree:19

    },
    {
        stronglyAgree:25,
        agree:16,
        stronglyDisagree:10,
        disagree:21

    }
  ] */

   // console.log('getting data',data)
   
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>QNo</th>
            <th>Strongly Agree</th>
            <th>Agree</th>
            <th>Strongly Disagree</th>
            <th>Disagree</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>

               <td>{index+1}</td> 
              <td>{item.stronglyAgree}</td>
              <td>{item.agree}</td>
              <td>{item.stronglyDisagree}</td>
              <td>{item.disagree}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;