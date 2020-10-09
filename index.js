const inquirer = require('inquirer');
const { execSync } = require('child_process');
const chalk = require('chalk');

const questions = [
	{
		type: 'checkbox',
		name: 'browser',
		message: 'Which Browser(s) Do you want to install ? ',
		choices: [
			new inquirer.Separator(' == Browsers =='),
			{ name: 'Brave' },
			{ name: 'Chrome' },
			{ name: 'Firefox' },
		],
	},
	{
		type: 'confirm',
		name: 'terminal',
		message: 'Do You want to install Oh My Zsh Terminal ?',
		default: true,
	},
	{
		type: 'checkbox',
		name: 'plugin',
		message: 'Which Plugins Do you want to install (recommened: all) ? ',
		choices: [
			new inquirer.Separator(' == Terminal Plugins =='),
			{ value: 1, name: 'Syntax Highlighting' },
			{ value: 2, name: 'Auto Suggestions' },
			{ value: 3, name: 'Command history search (fzf)' },
			{ value: 4, name: 'Command typo fixer (fuck)' },
		],
	},
];

inquirer.prompt(questions).then((answers) => {
	if (answers.browser.length > 0) {
		if (answers.browser.includes('Chrome')) {
			console.log(chalk.blueBright('Installing Chrome...'));
			try {
				execSync(
					'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
				);
				execSync('sudo apt install ./google-chrome-stable_current_amd64.deb');
				console.log(chalk.green('Successfully installed Chrome Browser!'));
			} catch (err) {
				console.log(chalk.red('Sorry, Google Chrome Installation Failed!!'));
			}
		}
		if (answers.browser.includes('Firefox')) {
			console.log('Firefox selected');
		}
		if (answers.browser.includes('Brave')) {
			console.log(chalk.blueBright('Installing Brave Browser...'));
			try {
				execSync('sudo apt install apt-transport-https curl');
				execSync(
					'curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -'
				);
				execSync(
					'echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list'
				);
				execSync('sudo apt update');
				execSync('sudo apt install brave-browser');
				console.log(chalk.green('Successfully installed Brave Browser!'));
			} catch (err) {
				console.log(chalk.red('Sorry, Brave Browser Installation Failed!!'));
			}
		}
	} else {
		console.log(chalk.yellowBright('Skipped Browser installation'));
	}

	const { terminal, plugin } = answers;

	if (terminal) {
		// Install git
		console.log(chalk.blueBright('Installing git...'));
		try {
			console.log(chalk.blueBright('Updating packages...'));
			const updatePackages = execSync('sudo apt update', { encoding: 'utf8' });
			console.log(updatePackages);
			console.log(chalk.blueBright('procceeding with git installation'));
			const gitInstall = execSync('sudo apt install git', { encoding: 'utf8' });
			console.log(gitInstall);
			const gitVersion = execSync('git --version', { encoding: 'utf8' });
			console.log(
				chalk.green('Successfully installed ' + chalk.yellow(gitVersion))
			);
		} catch (err) {
			console.log(chalk.red('Sorry! Failed to Install git'));
		}
		if (plugin.length > 0) {
			if (plugin.includes(1)) {
				// Syntax Highlighting
				execSync(
					'git clone https://github.com/zsh-users/zsh-syntax-highlighting.git'
				);
				execSync(
					'echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc'
				);
				execSync(
					'source ./zsh-syntax-highlighting/zsh-syntax-highlighting.zsh'
				);
			}
			if (plugin.includes(2)) {
				// Auto Suggestions
			}
			if (plugin.includes(3)) {
				// Command history
			}
			if (plugin.includes(4)) {
				try {
					// command typo fixer fuck
					execSync('sudo apt update');
					execSync(
						'sudo apt install python3-dev python3-pip python3-setuptools'
					);
					execSync('sudo pip3 install thefuck');
					console.log(chalk.green('Successfully installed thefuck'));
				} catch (err) {
					console.log(chalk.red('Failed to Install the Fuck plugin'));
				}
			}
		}
	}

	console.log(answers);
});
