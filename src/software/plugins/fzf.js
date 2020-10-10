const { execSync } = require('child_process');
const chalk = require('chalk');

const log = console.log;

module.exports = () => {
	try {
		log(chalk.blueBright('Installing command histroy plugin'));
		execSync('sudo apt-get install fzf');
		log(chalk.green('Successfully installed command histroy plugin'));
	} catch (err) {
		log(chalk.red('Failed to install command histroy plugin'));
	}
};
