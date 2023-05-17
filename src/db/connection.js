const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/student", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(e);
    console.log(`no connection`);
})
