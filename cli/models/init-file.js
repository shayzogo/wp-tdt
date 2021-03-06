const fs = require('fs');
const colors = require('colors');
const {convertSupportOptionsToBooleans} = require('./data-validation');
const {generateThemeFiles} = require('./generate-files');
const {getConfigFile} = require('./file-tools');

exports.generateThemeBasicFiles = () => {
    const themeConfigFile = getConfigFile();
    generateThemeFiles(themeConfigFile);
};

/**
 * Create new tdt.config.example.json file
 * This file creation will set only theme headers options
 * @param headers
 */
exports.createNewConfigFileWithThemeHeadersOnly = (headers) => {
    console.log('Generating new configuration file'.cyan);
    fs.writeFile('tdt.config.json', buildNewThemeHeadersOnly(headers), function (err) {
        if (err) throw err;
        console.log('tdt.config.json created'.green);
        console.log('For theme support configuration "tdt support"'.red);
    });
};

function buildNewThemeHeadersOnly(headers) {
    return `{
  "theme_headers": {
    "theme_name": "${headers.theme_name}",
    "theme_uri": "${headers.theme_uri}",
    "theme_description": "${headers.theme_description}",
    "theme_author": "${headers.theme_author}",
    "theme_author_uri": "${headers.theme_author_uri}",
    "theme_tags": "${headers.theme_tags}",
    "theme_text_domain": "${headers.theme_text_domain}"
  }
}`;
}

/**
 * Create theme support section in tdt.config.example.json
 */

exports.setNewThemeSupportSectionInConfigurationFile = (supportOptions) => {
    let currentConfigurationFile;
    supportOptions = convertSupportOptionsToBooleans(supportOptions);
    fs.readFile('tdt.config.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error while loading config file'.red);
            throw err;
        }
        currentConfigurationFile = JSON.parse(data);
        const supportSettings = buildConfigurationSupportSection(supportOptions);
        currentConfigurationFile.theme_support = supportSettings;
        currentConfigurationFile = JSON.stringify(currentConfigurationFile);
        fs.writeFile('tdt.config.json', currentConfigurationFile, function (err) {
            if (err) throw err;
            console.log('tdt.config.json created and minified'.green);
        });
    });

};

function buildConfigurationSupportSection(options) {
    let results = {};
    for (let option in options) {
        results[option] = options[option];
    }
    return results;
}
