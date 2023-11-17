#!/usr/bin/env node

import { Command } from 'commander';
import { analyze } from './analyze';
import { convert } from './convert';
import { encode } from './encode';
import { organize } from './organize';

const pkg = require('../package.json');
const program = new Command();
program.addCommand(analyze);
program.addCommand(convert);
program.addCommand(encode);
program.addCommand(organize);

program.version(pkg.version).parse(process.argv);
