'use strict';
require('dotenv').config()
const express = require('express');
const sql = require('mssql');
const server = express();
server.set('view engine','ejs');
const PORT = process.env.PORT || 3030;
const config = {
	server: process.env.SERVER,
	authentication: {
		type: 'default',
		options: {
			userName: process.env.USER_NAME,
			password: process.env.PASS,
		},
	},
	options: {
		database: 'sample',
		encrypt: false,
	}
}
server.get('/add',(req,res)=>{
    var conn = new sql.ConnectionPool(config);
    var requis = new sql.Request(conn);
    conn.connect(error=>{
        if (error){
            console.log(error);
            return;
        }
        requis.query(`insert into [sample].[dbo].[users] values ('ahmad','123')`,(err,data)=>{
            if(err){
                // console.log(err);
                res.send(err);
            }else{
                res.status(200).send('Done');
            }
            conn.close();
        })
    })
});
server.get('/',(req,res)=>{
        var conn = new sql.ConnectionPool(config);
    var requis = new sql.Request(conn);
    conn.connect(error=>{
        if (error){
            console.log(error);
            return;
        }
        requis.query(`select * from [sample].[dbo].[users] `,(err,data)=>{
            if(err){
                // console.log(err);
                res.send(err)
            }else{
                console.log(data.recordset);
                res.render('./index',{data: data.recordset[0]})
                // res.status(200).send(data.recordset);
            }
            conn.close();
        })
    })
    // res.send('hi');
})

server.listen(PORT,()=>{
    console.log(`listen to port ${PORT}`);
})
