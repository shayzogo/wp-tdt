#! /usr/bin/env node
// ###run npm link to activate cli###
const commander = require('commander');
const program = new commander.Command();
const colors = require('colors');
const inquirer = require('inquirer');
const {
    createNewConfigFileWithThemeHeadersOnly,
    setNewThemeSupportSectionInConfigurationFile,
    generateThemeBasicFiles
} = require('./cli/models/init-file');
const {generateTemplateFile} = require('./cli/models/generate-files');

program.version('0.0.1')
    .description('Wordpress Theme Developer Tools cli');

program.command('init')
    .description('Set new theme headers for configuration file')
    .action(() => {
        inquirer
            .prompt([
                {type: 'input', name: 'theme_name', message: "What is your theme name?"},
                {type: 'input', name: 'theme_uri', message: "What is your theme URI?"},
                {type: 'input', name: 'theme_description', message: "What is your theme description?"},
                {type: 'input', name: 'theme_author', message: "What is the name of theme author?"},
                {type: 'input', name: 'theme_author_uri', message: "What is the theme author URI?"},
                {type: 'input', name: 'theme_tags', message: "What are the theme tags"},
                {
                    type: 'input',
                    name: 'theme_text_domain',
                    message: "Please set text domain for the theme (will be used for translations)"
                }
            ])
            .then(answers => {
                createNewConfigFileWithThemeHeadersOnly(answers);
            });
    });

program.command('support')
    .description('Set new theme support')
    .action(() => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'automatic-feed-links',
                    message: 'automatic-feed-links',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'post-formats',
                    message: 'post-formats',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'post-thumbnails',
                    message: 'post-thumbnails',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'custom-background',
                    message: 'custom-background',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'html-5',
                    message: 'html-5',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'title-tag',
                    message: 'title-tag',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'custom-logo',
                    message: 'custom-logo',
                    choices: ['true', 'false'],
                }
            ])
            .then(answers => {
                setNewThemeSupportSectionInConfigurationFile(answers);
            })
    });


program.command('generate')
    .description('Generate the basic new theme files include core template files, functions and styles')
    .action(() => {
        console.log('Basic file generation started'.blue);
        generateThemeBasicFiles();
        console.log('Basic file generation finished'.yellow);
    });


program.command('create')
    .description('Use this command to create new template files, widgets etc...')
    .action(() => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'new_asset',
                    message: 'create-new-asset',
                    choices: ['Template File', 'Widget', 'CPT', 'Taxonomy', 'Dashboard Widget', 'Menu', 'Options Page', 'Sidebar']
                }
            ])
            .then(answers => {
                switch (answers.new_asset) {
                    case 'Template File':
                        inquirer
                            .prompt([
                                {type: 'input', name: 'template_name', message: "What is template name?"},
                            ])
                            .then(answers => {
                                generateTemplateFile(answers.template_name);
                            });
                        break;
                    case 'Widget':
                        break;
                    case 'CPT':
                        break;
                    case 'Taxonomy':
                        break;
                    case 'Dashboard Widget':
                        break;
                    case 'Menu':
                        break;
                    case 'Options Page':
                        break;
                    case 'Sidebar':
                        break;
                }
            })
    });

program.parse(process.argv);