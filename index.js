const inquirer = require('inquirer');
const { execSync } = require('child_process');

const questions = [
  {
    type: 'checkbox',
    name: 'browser',
    message: 'Which Browser(s) Do you want to install ? ',
    choices: [
      new inquirer.Separator(' == Browsers =='),
      { name: 'Brave' },
      { name: 'Chrome' },
    ],
  },
];

inquirer.prompt(questions).then((answers) => {
  if (answers.browser.length > 0) {
    if (answers.browser.includes('Chrome')) {
      console.log('Chrome selected');
      try {
        const output = execSync('ls -la', { encoding: 'utf8' });
        console.log(output);
      } catch (err) {
        console.log(err);
      }
    }
    if (answers.browser.includes('Firefox')) {
      console.log('Firefox selected');
    }
    if (answers.browser.includes('Brave')) {
      console.log('Brave selected');
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
      } catch (err) {
        console.log('Sorry, We are unable to install Brave!');
      }
    }
  }
});
