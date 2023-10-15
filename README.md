# sfz-tools-cli
![Test](https://github.com/kmturley/sfz-tools-cli/actions/workflows/test.yml/badge.svg)

Command line tool for handling SFZ and audio files using:

* NodeJS 12.x
* TypeScript 4.x


## Installation

To install the tool, run the command:

    npm install @sfz-tools/cli -g

Verify the tool has been installed by running:

    sfz-tools --version


## Usage

Convert a local sfz file to json/xml using:

    sfz-tools convert ./test/syntax/basic.sfz --json
    sfz-tools convert ./test/syntax/basic.sfz --xml

Convert a local directory of file to json/xml using glob patterns:

    sfz-tools convert "./test/**/*.sfz" --json
    sfz-tools convert "./test/**/*.sfz" --xml

Convert a remote sfz file to json/xml using:

    sfz-tools convert https://raw.githubusercontent.com/sfzinstruments/jlearman.jRhodes3c/master/jRhodes3c-looped-flac-sfz/_jRhodes-stereo-looped.sfz --json
    sfz-tools convert https://raw.githubusercontent.com/sfzinstruments/jlearman.jRhodes3c/master/jRhodes3c-looped-flac-sfz/_jRhodes-stereo-looped.sfz --xml

Write the converted result to disk:

    sfz-tools convert ./test/syntax/basic.sfz --json --write

Enable logging:

    sfz-tools convert ./test/syntax/basic.sfz --json --log


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
