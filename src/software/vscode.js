const { execSync } = require('child_process');
const chalk = require('chalk');

module.exports = () => {
	try {
		console.log(chalk.blueBright('Installing VSCode... Please wait'));
		execSync(
			'wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg'
		);
		execSync(
			'sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/'
		);
		execSync(
			`sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'`
		);
		execSync('sudo apt-get install apt-transport-https');
		execSync('sudo apt-get update');
		execSync('sudo apt-get install code');
		console.log(chalk.green('Successfully installed VSCode'));
	} catch (error) {
		console.log(chalk.red('Failed to install VSCode'));
	}
};
