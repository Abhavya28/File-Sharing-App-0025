const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => { 

    try {
        // Find the file by UUID
        const file = await File.findOne({ uuid: req.params.uuid });
        
        // Link expired
        if (!file) {
        return res.render("download", { error: "Link has been expired." });
        }

        const filePath = `${__dirname}/../${file.path}`;

        res.download(filePath, file.filename, (err) => {
            if (err) {
                return res.render("download", { error: "Something went wrong." });
            }
        });
        
    } catch (err) {
        return res.render("download", { error: "Something went wrong." });
    }
})

module.exports = router;