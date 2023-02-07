import path from 'path'
import fs from 'fs'
import prompts from 'prompts'
import spawn from 'cross-spawn'
import chalk from 'chalk'
import minimist from 'minimist'
import downloadGitRepo from 'download-git-repo'
import ora from 'ora'
import { pkgFromUserAgent, isValidPackageName, emptyDir, copy, updatePackage } from './utils.js'

const defaultProjectName = 'sdc-web'

// console.log(process.cwd())

// console.log("process.argv:", process.argv)
// console.log("minimist:", minimist(process.argv.slice(2), { string: ['_'] }))

// console.log('process.env>>>', process.env.npm_config_user_agent, pkgFromUserAgent(process.env.npm_config_user_agent))
const spinner = ora('正在下载，请稍候...')

const start = async () => {
  let projectDir = defaultProjectName
  // 用户交互列表
  const answer = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: '项目名称？',
      initial: defaultProjectName,
      onState: (state) => {
        state.value = state.value.trim().replace(/\/+$/g, '')
        // console.log('>>>1', state)
      },
      validate: (name) => {
        if (isValidPackageName(name)) {
          return true
        }
        return '格式错误，请重新输入'
      }
    },
    {
      type: (pre) => (fs.existsSync(pre) ? 'confirm' : null),
      name: 'override',
      message: (pre) => `项目名称目录${pre}已存在，是否覆盖？`,
    },
    {
      type: (override) => {
        if (override === false) {
          throw new Error(chalk.red('✖ 操作已取消'))
        }
        return null
      },
      name: 'overrideChecker'
    },
    {
      type: 'text',
      name: 'description',
      message: '项目描述？',
      initial: `快速生成项目脚手架..`
    },
    {
      type: 'select',
      name: 'framework',
      message: '选择框架？',
      choices: () => [
        { title: 'SDC', value: 'sdc' },
        { title: 'Vue', value: 'vue' },
        { title: 'React', value: 'react' }
      ],
      initial: 0
    },
    {
      type: 'select',
      name: 'language',
      message: (pre) => pre === 'sdc' ? '选择模板？' : '选择开发语言？',
      choices: (pre) => {
        const sdcTemplate = [
          { title: 'web', value: 'web' },
          { title: 'mobile- 不建议使用', value: 'mobile' },
          { title: 'mfe', value: 'mfe' }
        ]
        const langList = [
          { title: 'JavaScript', value: 'js' },
          { title: 'TypeScript', value: 'ts' }
        ]
        if (pre === 'sdc') {
          return sdcTemplate
        }
        if (pre === 'vue') {
          langList.push({ title: 'Customize with create-vue ↗', value: 'custom' })
        }
        return langList
      },
      initial: 0
    }
  ], {
    onCancel: () => {
      throw new Error(chalk.red('✖ 操作已取消'))
    }
  })
  // console.log(answer)

  const { projectName, override, framework, language } = answer

  projectDir = projectName

  const userAgent = process.env.npm_config_user_agent ?? ''
  const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

  if (language === 'custom') {
    console.log('自定义语言')
    const customCommand = 'npm create vue@latest TARGET_DIR'
    const fullCustomCommand = customCommand.replace('TARGET_DIR', projectDir)
    console.log(fullCustomCommand)
    const [command, ...args] = fullCustomCommand.split(' ')
    console.log('>>>>', command, args)
    const { status } = spawn.sync(command, args, {
      stdio: 'inherit'
    })
    process.exit(status ?? 0)
  }

  if (framework === 'react') {
    const customCommand = `npx create-react-app TARGET_DIR ${language === 'ts' ? '--template typescript' : ''}`
    const fullCustomCommand = customCommand.replace('TARGET_DIR', projectDir)
    const [command, ...args] = fullCustomCommand.split(' ')
    const { status } = spawn.sync(command, args, {
      stdio: 'inherit'
    })
    process.exit(status ?? 0)
  }

  // 判断目标目录是否存在
  const targetDir = path.join(process.cwd(), projectDir)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  } else if (override) {
    console.log('覆盖文件')
    emptyDir(targetDir)
  }
  console.log(chalk.cyan('\n项目生成路径：'), targetDir, '\n')

  // 下载模板目录
  const templateName = `template-${framework}-${language}`
  const templateRoot = path.resolve(process.cwd(), './templates', templateName)
  // console.log(templateName, templateRoot)

  spinner.start()

  // 下载文件
  if (framework === 'sdc') {
    const srcMap = {
      'web': 'direct:https://git.woa.com/hr-team/nts/SDCFront/sdc-web-app.git#master',
      'mobile': 'direct:https://git.woa.com/hr-team/nts/SDCFront/sdc-mob-app.git#master',
      'mfe': 'direct:https://git.woa.com/hr-team/nts/SDCFront/sdc-mfe.git#master'
    }
    const srcPath = srcMap[language]
    await new Promise((resolve, reject) => {
      downloadGitRepo(srcPath, targetDir,  { clone: true }, (err) => {
        if (err) {
          reject(err)
          // console.log(chalk.red(err))
          process.exit()
        }
        resolve()
      })
    })
  } else {
    copy(templateRoot, targetDir)
  }

  // 更新package信息
  updatePackage(targetDir, answer, () => {
    printMessage()
    spinner.stop()
  })

  function printMessage () {
    console.log(chalk.green('\n\n项目创建成功!!!\n'))
    console.log(chalk.cyan(`  cd ${projectName}`))
    console.log(chalk.cyan('  npm install'))
    console.log(chalk.cyan('  npm run dev'))
  }

}

start().catch(err => {
  console.error("Error Info >>>>>", err.message)
  spinner.stop()
})