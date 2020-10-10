import { execSync } from 'child_process';

const log = console.log;

module.exports = () => {
	try {
		// Syntax Highlighting
		log(chalk.blueBright('Installing Syntax Highlighting'));
		execSync(
			'git clone https://github.com/zsh-users/zsh-syntax-highlighting.git'
		);
		execSync(
			'echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc'
		);
		execSync('source ./zsh-syntax-highlighting/zsh-syntax-highlighting.zsh');
		log(chalk.green('Successfully installed Syntax Highlighting'));
	} catch (err) {
		log(chalk.red('Failed to install Syntax Highlighting 😞'));
	}
};
