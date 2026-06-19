const fs = require('fs');
const path = require('path');

// Point to your Dataset folder
const datasetDir = path.join(__dirname, 'Dataset');
const outputFile = path.join(datasetDir, 'folders.json');

try {
    // 1. Read all contents of the Dataset folder
    const items = fs.readdirSync(datasetDir);

    // 2. Filter out files so we only keep actual directories (folders)
    const folders = items.filter(item => {
        const itemPath = path.join(datasetDir, item);
        return fs.statSync(itemPath).isDirectory();
    });

    // 3. Write the list of folders into folders.json
    fs.writeFileSync(outputFile, JSON.stringify(folders, null, 2));
    
    console.log(`Success! Automatically generated folders.json with ${folders.length} folders.`);
} catch (error) {
    console.error("Error generating folders.json:", error);
    process.exit(1); // Stop the build if it fails
}