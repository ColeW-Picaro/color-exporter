fs = require("fs");

class CssExport {
    constructor(name) {
	this.name = name;
	this.varPrefix = "--";
	this.css = ":root {\n";
	this.colors = require("./" + this.name + ".json");
    }

    /*
      generates the Css for this color scheme
      modifies this.css
     */
    genCss() {
	const colors = this.colors;
	console.log(colors);
	for (var key in colors) {	    
	    this.css += this.varPrefix + key + ": " + colors[key] + "\n";
	}
	this.css += "}\n";
    }
}

function main() {
    // 3 command line args required
    // 0: node
    // 1: colors.js
    // 2: filename WITHOUT .json
    if (process.argv.length != 3) {
	console.log("Error: missing argument\nUsage: node colors.js <scheme without .json>");
	return;
    }
    
    var name = process.argv[2];
    var cssExport = new CssExport(name);
    cssExport.genCss();
    console.log(cssExport.css);

    fs.writeFile(name + ".css", cssExport.css, function (err) {
	if (err) return console.log(err);
	console.log("Check " + name + ".css");
    });
    return;
}

main();
