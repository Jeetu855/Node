1)SQL : MySQL
Tables
Rows : Tuples
Columns : Attributes
Relational
Data Schema
vertical scaling possible
horizontal scaling difficult

2)NoSQL : MongoDB
Schemaless
No real relation so we duplicate data
No Structure
vertical scaling possible
horizontal scaling possible

Key Value

Column Based

Document Based

Graph based

Scaling
Horizontal vs Vertical

Horizontal: Add more servers
Vertical: Make existing server stronger(increase CPU processing power)

npm install --save mysql2

mysql: default port: 3306
to connect to databse, /util/databse.js --> allows us to connect to DB and gives back connection object which allows us to run queries
info about database and user in /util/databse.js
default username: root
