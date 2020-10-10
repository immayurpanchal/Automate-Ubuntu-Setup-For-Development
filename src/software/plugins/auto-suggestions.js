const { execSync } = require('child_process');
const chalk = require('chalk');

const log = console.log;

module.exports = () => {
	try {
		log(chalk.blueBright('Installing zsh-autosuggestion plugin'));
		execSync(
			'git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions'
		);
		execSync('source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh');
		// Add in plugin section of .zshrc file
		log(chalk.green('Successfully installed auto suggestion plugin'));
	} catch (err) {
		log(chalk.red('Failed to install zsh-autosuggestions plugin'));
	}
};
