const { spawn, spawnSync } = require('child_process');
const chalk = require('chalk');

const zsh = () => {
	return new Promise((resolve, reject) => {
		const zsh = spawn('sudo', ['apt', 'install', 'zsh']);

		// const zsh = spawn('sudo apt install zsh')

		zsh.stdout.on('data', (data) => {
			console.log(data.toString('utf8'));
		});

		zsh.stderr.on('data', (data) =>
			console.log(chalk.yellow(data.toString('utf8')))
		);

		zsh.on('error', (err) => {
			console.log(chalk.red(err.toString('utf8')));
			reject();
		});

		zsh.on('close', (exitCode) => {
			if (exitCode === 0) {
				console.log(chalk.green('Successfully installed zsh.'));
				resolve();
			}
			reject();
		});
	});
};

const cloneOhMyZsh = () => {
	return new Promise((resolve, reject) => {
		const ohMyZsh = spawn('git', [
			'clone',
			'https://github.com/robbyrussell/oh-my-zsh.git',
			'~/.oh-my-zsh',
		]);

		ohMyZsh.stdout.on('data', (data) => console.log(data.toString('utf8')));
		ohMyZsh.stderr.on('data', (data) =>
			console.log(chalk.yellow(data.toString('utf8')))
		);

		ohMyZsh.on('close', (exitCode) => {
			if (exitCode === 0) {
				console.log(chalk.green('Successfully installed oh my zsh'));
				resolve();
			}
			reject();
		});
	});
};

const moveZshRepo = () => {
	return new Promise((resolve, reject) => {
		const moveZshRepo = spawn('cp', [
			'~/.oh-my-zsh/templates/zshrc.zsh-template',
			'~/.zshrc',
		]);

		moveZshRepo.stdout.on('data', (data) => console.log(data.toString('utf8')));
		moveZshRepo.stderr.on('data', (data) =>
			console.log(chalk.yellow(data.toString('utf8')))
		);

		moveZshRepo.on('close', (exitCode) => {
			if (exitCode === 0) {
				console.log(chalk.green('Moved cloned repo to ~/.oh-my-zsh'));
				resolve();
			}
			reject();
		});
	});
};

const changeDefaultShell = () => {
	return new Promise((resolve, reject) => {
		try {
			spawnSync('chsh', ['-s', '/bin/zsh'], {
				stdio: 'inherit',
				stdin: 'inherit',
			});
			resolve();
		} catch (error) {
			reject();
		}
	});
};

module.exports = {
	cloneOhMyZsh,
	zsh,
	moveZshRepo,
	changeDefaultShell,
};
