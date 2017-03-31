var express = require("express");
var port = process.env.PORT || 8080;
var resObj = {"IP Address" : null, "Language" : null, "Software" : null};
var app = express();

app.get("/api/whoami", function(req, res){
    "use strict";
    let lang = req.headers["accept-language"];
    let soft = req.headers["user-agent"];

    resObj["IP Address"] = req.headers["x-forwarded-for"];
    resObj["Language"] = lang.slice(0, lang.indexOf(","));
    resObj["Software"] = soft.slice(soft.indexOf("(") +1, soft.indexOf(")"));
    res.send(resObj);
});

app.get(/(^\/$|\/api)/, function(req, res){
    res.send("Please redirect to: <a href='/api/whoami'>/api/whoami</a> to view results");
});

app.get("*", function(req, res){
    res.send("404: Page not found");
});

app.listen(port, function(){
    console.log("Service listening on port: " + port);
});
