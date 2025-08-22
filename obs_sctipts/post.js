const util = require('util');

const child_process = require('child_process');

const exec = util.promisify(child_process.exec);



function getCreateTimeAsFileName() {

    var d = new Date();

    var year = d.getFullYear();

    function month() {
        const m = JSON.stringify(d.getMonth())
        if (m.length === 1) {
            return "0" + (d.getMonth() + 1)
        } else {
            return d.getMonth() + 1
        }
    }
    function day() {
        const m = JSON.stringify(d.getDate())
        if (m.length === 1) {
            return "0" + d.getDate()
        } else {
            return d.getDate()
        }
    }
    function hour() {
        const m = JSON.stringify(d.getHours())
        if (m.length === 1) {
            return "0" + d.getHours()
        } else {
            return d.getHours()
        }
    }
    function minute() {
        const m = JSON.stringify(d.getMinutes())
        if (m.length === 1) {
            return "0" + d.getMinutes()
        } else {
            return d.getMinutes()
        }
    }
    function second() {
        const m = JSON.stringify(d.getSeconds())
        if (m.length === 1) {
            return "0" + d.getSeconds()
        } else {
            return d.getSeconds()
        }
    }

    var time = year + month() + day() + hour() + minute() + second();

    return time;

}





// execute command function



async function executeCommand() {

    const fileName = "index.md";

    const { stdout, stderr } = await exec('pnpm run new-post ' + getCreateTimeAsFileName() + '/' + fileName, { cwd: app.fileManager.vault.adapter.basePath });

    console.log('stdout:', stdout);

    console.log('stderr:', stderr);

    if (stdout) {

        new Notice("New Blog Created[" + fileName + "]")

    } else {

        new Notice("New Blog Create Faild. " + stderr)

    }

}





module.exports = async function (context, req) {

    await executeCommand();

}
