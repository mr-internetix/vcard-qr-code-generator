const router = require('express').Router();
const QRLogo = require('qr-with-logo');
const QRCode = require('qrcode');
const multer = require("multer")
const path = require('path')


// multerSetup

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './book'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

let upload = multer({
    storage,
    limits: { fileSize: 100000 * 100 }
})

router.post('/vCard2', upload.single('myfile'), async(req, res) => {
    // console.log(req.file)
if(req.file){

    var a, b = req.body.surName, // surname
        c = req.body.firstName, //firstName
        d = req.body.title, // Title 
        e = req.body.address, //address 
        g = req.body.telephone, //Telephone 
        h = req.body.telephone2, // telephone 
        i = req.body.website, // website 
        j = req.body.email; //email 
    k = req.body.company; // company 

    a = "BEGIN:VCARD", a += "\r\nN:" + b + ";" + c + ";;;",
        a += "\r\nFN: " + c + "  " + b, d && (a += "\r\nTITLE:" + d),
        e && (a += "\r\nADR;WORK:;;" + e + ";;;;"), g && (a += "\r\nTEL;CELL,VOICE:" + g),
        h && (a += "\r\nTEL;WORK,VOICE:" + h), i && (a += "\r\nURL;WORK:" + i), j && (a += "\r\nEMAIL;INTERNET,HOME:" + j),
        k && (a += "\r\nORG:" + k), a += "\r\nEND:VCARD"


    // const data = JSON.stringify(req.body)

    await QRLogo.generateQRWithLogo(a, req.file.path, {}, "Base64", "qrlogo.png", async function(b64) {
        res.json({ "image": "data:image/png;base64," + b64 });
    });


}else{

    var a, b = req.body.surName, // surname
            c = req.body.firstName, //firstName
            d = req.body.title, // Title 
            e = req.body.address, //address 
            g = req.body.telephone, //Telephone 
            h = req.body.telephone2, // telephone 
            i = req.body.website, // website 
            j = req.body.email; //email 
        k = req.body.company; // company 

        a = "BEGIN:VCARD", a += "\r\nN:" + b + ";" + c + ";;;",
            a += "\r\nFN: " + c + "  " + b, d && (a += "\r\nTITLE:" + d),
            e && (a += "\r\nADR;WORK:;;" + e + ";;;;"), g && (a += "\r\nTEL;CELL,VOICE:" + g),
            h && (a += "\r\nTEL;WORK,VOICE:" + h), i && (a += "\r\nURL;WORK:" + i), j && (a += "\r\nEMAIL;INTERNET,HOME:" + j),
            k && (a += "\r\nORG:" + k), a += "\r\nEND:VCARD"

        QRCode.toDataURL(a, function(err, url) {
            res.json({ "image": url })
        })
    
}
    
})



router.post("/vCard", async(req, res) => {
    console.log(req.body.telephone)
    if (req.body) {

        var a, b = req.body.surName, // surname
            c = req.body.firstName, //firstName
            d = req.body.title, // Title 
            e = req.body.address, //address 
            g = req.body.telephone, //Telephone 
            h = req.body.telephone2, // telephone 
            i = req.body.website, // website 
            j = req.body.email; //email 
        k = req.body.company; // company 

        a = "BEGIN:VCARD", a += "\r\nN:" + b + ";" + c + ";;;",
            a += "\r\nFN: " + c + "  " + b, d && (a += "\r\nTITLE:" + d),
            e && (a += "\r\nADR;WORK:;;" + e + ";;;;"), g && (a += "\r\nTEL;CELL,VOICE:" + g),
            h && (a += "\r\nTEL;WORK,VOICE:" + h), i && (a += "\r\nURL;WORK:" + i), j && (a += "\r\nEMAIL;INTERNET,HOME:" + j),
            k && (a += "\r\nORG:" + k), a += "\r\nEND:VCARD"

        QRCode.toDataURL(a, function(err, url) {
            res.json({ "image": url })
        })

    }

})



module.exports = router;