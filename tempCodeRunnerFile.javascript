import SparkMD5 from "spark-md5";
import jwt from "jsonwebtoken"
const data={"phrase": "valve opera worry smart capable scout arm faith relax axis birth prefer intact possible tackle sunny come adult napkin keen jelly rent timber equal",
"pwd": "V_P#tTO$4^TB@7&fty*(GyKw/2"}

// const hashed =SparkMD5.hash(data)
// console.log(SparkMD5.);

const key = "82E($A0&u1n6G0(xq*Exo(E$rb&o*UbYWq$6#KP*@KknQSyllSk)F"
const hashed=jwt.sign(data,key)
console.log(hashed);
// console.log(jwt.decode(hashed));

