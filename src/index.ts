#!/usr/bin/env node

import { Command } from 'commander';
import { convert } from './convert';

const pkg = require('../package.json');
const program = new Command();
program.addCommand(convert);

program.version(pkg.version).parse(process.argv);
