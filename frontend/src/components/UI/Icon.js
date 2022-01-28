import React from 'react'

import { AiOutlineAndroid } from 'react-icons/ai'
import { FaAws } from 'react-icons/fa'
import { SiAngular } from 'react-icons/si'
import { FiChrome } from 'react-icons/fi'
import { BsTerminalFill } from 'react-icons/bs'
import { FaCss3 } from 'react-icons/fa'
import { SiDocker } from 'react-icons/si'
import { SiElixir } from 'react-icons/si'
import { SiEmberDotJs } from 'react-icons/si'
import { FaErlang } from 'react-icons/fa'
import { SiFlutter } from 'react-icons/si'
import { BiGitBranch } from 'react-icons/bi'
import { SiHeroku } from 'react-icons/si'
import { AiFillHtml5 } from 'react-icons/ai'
import { SiJavascript } from 'react-icons/si'
import { SiLinux } from 'react-icons/si'
import { GoMarkdown } from 'react-icons/go'
import { DiMongodb } from 'react-icons/di'
import { GrNode } from 'react-icons/gr'
import { FaApple } from 'react-icons/fa'
import { SiRails } from 'react-icons/si'
import { SiReact } from 'react-icons/si'
import { SiRedis } from 'react-icons/si'
import { DiRuby } from 'react-icons/di'
import { SiRust } from 'react-icons/si'
import { SiTerraform } from 'react-icons/si'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { BsInfoCircleFill } from 'react-icons/bs'
import { GiCrystalEye } from 'react-icons/gi'
import { FiCode } from 'react-icons/fi'
import { SiKubernetes } from 'react-icons/si'
import { FaMeetup } from 'react-icons/fa'
import { FaPhoenixFramework } from 'react-icons/fa'
import { AiFillApi } from 'react-icons/ai'
import { MdHttp } from 'react-icons/md'
import { SiAzuredevops } from 'react-icons/si'
import { GrTest } from 'react-icons/gr'
import { FaReact } from 'react-icons/fa'
import { GrMysql } from 'react-icons/gr'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import { BsFillCircleFill } from 'react-icons/bs'

import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'

const Icon = ({ name }) => {
  switch (name) {
    case 'arrowleft':
      return <MdKeyboardArrowLeft />
    case 'profile':
      return <CgProfile />
    case 'logout':
      return <FiLogOut />
    case 'android':
      return <AiOutlineAndroid />
    case 'angular':
      return <SiAngular />
    case 'aws':
      return <FaAws />
    case 'chrome':
      return <FiChrome />
    case 'cicd':
      return <MdHttp />
    case 'commandline':
      return <BsTerminalFill />
    case 'crystal':
      return <GiCrystalEye />
    case 'css':
      return <FaCss3 />
    case 'devops':
      return <SiAzuredevops />
    case 'docker':
      return <SiDocker />
    case 'elixir':
      return <SiElixir />
    case 'ember':
      return <SiEmberDotJs />
    case 'erlang':
      return <FaErlang />
    case 'flutter':
      return <SiFlutter />
    case 'general':
      return <FiCode />
    case 'git':
      return <BiGitBranch />
    case 'heroku':
      return <SiHeroku />
    case 'html':
      return <AiFillHtml5 />
    case 'javascript':
      return <SiJavascript />
    case 'k8s':
      return <SiKubernetes />
    case 'linux':
      return <SiLinux />
    case 'markdown':
      return <GoMarkdown />
    case 'meetup':
      return <FaMeetup />
    case 'mongodb':
      return <DiMongodb />
    case 'nodejs':
      return <GrNode />
    case 'osx':
      return <FaApple />
    case 'phoenix':
      return <FaPhoenixFramework />
    case 'qa':
      return <GrTest />
    case 'rails':
      return <SiRails />
    case 'react':
      return <SiReact />
    case 'react-native':
      return <FaReact />
    case 'redis':
      return <SiRedis />
    case 'ruby':
      return <DiRuby />
    case 'rust':
      return <SiRust />
    case 'sql':
      return <GrMysql />
    case 'terraform':
      return <SiTerraform />
    case 'vault':
      return <AiFillApi />
    case 'facebook':
      return <FaFacebook />
    case 'instagram':
      return <FaInstagram />
    case 'info':
      return <BsInfoCircleFill />
    case 'cancel':
      return <MdCancel />
    default:
      return <BsFillCircleFill />
  }
}

export default Icon
