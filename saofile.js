module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'description',
        message: 'How would you descripe the new project',
        default: ''
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your email?',
        default: this.gitUser.email,
        store: true
      },
      {
        type: 'confirm',
        name: 'gitInit',
        message: 'Should git init local repo',
        default: true
      },
      {
        type: 'confirm',
        name: 'npmInstall',
        message: 'Should use npm to install packages',
        default: false
      }
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        '_package.json': 'package.json'
      }
    }
  ],
  async completed() {
    if (this._answers.gitInit) {
      this.gitInit()
    }
    if (this._answers.npmInstall) {
      await this.npmInstall()
    }
    this.showProjectTips()
  }
}
