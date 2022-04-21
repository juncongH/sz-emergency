module.exports={
    devServer:{
        // host:"localhost",
        // port:8085,
        https:false,
        open:true,
        proxy:{
            "/api":{
                target:"http://api.k780.com",
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    "^/api":""
                }
            },
        }
    }
}