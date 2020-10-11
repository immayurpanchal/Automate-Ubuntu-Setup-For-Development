const { spawn } = require('child_process');
const chalk = require('chalk');

module.exports = () =>
	new Promise((resolve, reject) => {
		const powerline = spawn('sudo', [
			'apt-get',
			'install',
			'powerline',
			'fonts-powerline'
		]);

		powerline.stdout.on('data', (data) => {
			console.log(chalk.blueBright(data.toString('utf8')));
		});

		powerline.stderr.on('data', (data) =>
			console.log(chalk.yellow(data.toString('utf8')))
		);

		powerline.on('error', (err) => {
			console.log(chalk.red(err.toString('utf8')));
			reject();
		});

		powerline.on('close', (exitCode) => {
			if (exitCode === 0) resolve();
			reject();
		});
	});
