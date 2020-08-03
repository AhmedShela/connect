const {Connection, Request} = require("tedious");
require('dotenv').config()
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3030;
// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "KHAL", // update me
            password: "Theshadow1993!@#" // update me
        },
        type: "default"
    },
    server: "khal-server.database.windows.net", // update me
    options: {
        database: "HR_Data", // update me
        encrypt: true
    }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        // queryDatabase();
    }
});
server.get('/',(req,res)=>{
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `select * from [HR_Data].[dbo].[Emp_general]`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {

          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("requestCompleted", columns => {
        // let arr = columns.map(column =>{
        //     return column.value
        // })
        res.send(columns)
        // columns.forEach(column => {
        //   console.log("%s\t%s", column.metadata.colName, column.value);
        // });
      });

    connection.execSql(request);
});

// function queryDatabase(req,res) {
//     console.log("Reading rows from the Table...");

//     // Read all rows from table
//     const request = new Request(`select * from [HR_Data].[dbo].[Emp_general]`, (err, rowCount) => {
//         if (err) {
//             console.error(err.message);
//         } else {

//             console.log(`${rowCount} row(s) returned`);
//         }
//     });

//     request.on("row", columns => {
//         let data = columns.map(column => {
//             return column.metadata.colName,
//             column.value;
//         });
//         res.send(data)
//     });

//     connection.execSql(request);
// }
server.listen(PORT, () => {
    console.log(`listen to port ${PORT}`);
})
