#!/usr/bin/env node

import { Command } from 'commander';
import { convert } from './convert';
import { encode } from './encode';

const pkg = require('../package.json');
const program = new Command();
program.addCommand(convert);
program.addCommand(encode);

program.version(pkg.version).parse(process.argv);
