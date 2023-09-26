# sfz-tools-cli
![Test](https://github.com/kmturley/sfz-tools-cli/workflows/Test/badge.svg)

Command line tool for handling SFZ and audio files using:

* NodeJS 12.x
* TypeScript 4.x


## Installation

To install the tool, run the command:

    npm install @sfz-tools/cli -g

Verify the tool has been installed by running:

    sfz-tools --version


## Usage

Convert an sfz file to json/xml using:

    sfz-tools convert ./test/basic.sfz --json
    sfz-tools convert ./test/basic.sfz --xml


## Updating CLI code

Install plugin source code locally:

    npm link

Update source code and test using normal commands:

    sfz-tools --version

To publish and release changes and create a version tag using:

    npm version patch
    git push && git push origin --tags
    npm publish


## Contact

For more information please contact kmturley
