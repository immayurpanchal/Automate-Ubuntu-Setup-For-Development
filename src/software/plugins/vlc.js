const { execSync } = require('child_process');
const chalk = require('chalk');

const log = console.log;

module.exports = () => {
	try {
		log(chalk.blueBright('Installing VLC... Please wait...'));
		execSync('sudo snap install VLC');
		log(chalk.green('Successfully installed VLC'));
	} catch (err) {
		log(chalk.red('Failed to install VLC'));
	}
};
