#!/usr/bin/env node

import { Command } from 'commander';
import { analyzeCmd } from './analyze';
import { compactCmd } from './compact';
import { convertCmd } from './convert';
import { encodeCmd } from './encode';
import { organizeCmd } from './organize';
import { spliceCmd } from './splice';

const pkg = require('../package.json');
const program = new Command();
program.addCommand(analyzeCmd);
program.addCommand(compactCmd);
program.addCommand(convertCmd);
program.addCommand(encodeCmd);
program.addCommand(organizeCmd);
program.addCommand(spliceCmd);

program.version(pkg.version).parse(process.argv);
