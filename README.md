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


## Analyze audio files to detect audio features

    sfz-tools analyze "./test/audio/**/*.wav" --duration --key --loudness
    sfz-tools analyze "./test/audio/scale.wav" --duration --key --loudness
    sfz-tools analyze https://github.com/kmturley/sfz-tools-core/raw/main/test/audio/scale-piano.wav --duration --key --loudness


## Convert sfz files to other formats

Convert a local sfz file to json/xml using:

    sfz-tools convert "./test/syntax/basic.sfz" --js
    sfz-tools convert "./test/syntax/basic.sfz" --xml

Convert a local directory of file to json/xml using glob patterns:

    sfz-tools convert "./test/syntax/**/*.sfz" --js
    sfz-tools convert "./test/syntax/**/*.sfz" --xml

Convert a remote sfz file to json/xml using:

    sfz-tools convert https://raw.githubusercontent.com/sfzinstruments/jlearman.jRhodes3c/master/jRhodes3c-looped-flac-sfz/_jRhodes-stereo-looped.sfz --js
    sfz-tools convert https://raw.githubusercontent.com/sfzinstruments/jlearman.jRhodes3c/master/jRhodes3c-looped-flac-sfz/_jRhodes-stereo-looped.sfz --xml

Write the converted result to disk:

    sfz-tools convert "./test/syntax/basic.sfz" --js --write


## Encode audio files into other formats

    sfz-tools encode "./test/audio/**/*.wav" --flac
    sfz-tools encode "./test/audio/scale.wav" --ogg
    sfz-tools encode https://github.com/studiorack/basic-harmonica/raw/main/samples/harmonica_1.flac --wav


## Organize files using pattern

Create example files and parse filenames for metadata:

    bash ./test/create.sh
    sfz-tools organize "./test/files/**/*.wav" --log

Rename example files using a pattern:

    sfz-tools organize "./test/files/**/*.wav" --rename '$item[0]_$item[1]_$note_rr$round' --log

Rename example files and organize into folder using a pattern:

    sfz-tools organize "./test/files/**/*.wav" --rename '$item[0]/$item[1]/$note_rr$round' --log


## Splice audio files into separate notes

Detect notes and output each as sequential files:

    sfz-tools splice "./test/audio/scale.wav" --log

Detect notes and output each using a custom pattern:

    sfz-tools splice "./test/audio/scale.wav" --rename '_$octave$name' --log

Detect notes and output each into folder using a pattern:

    sfz-tools splice "./test/audio/scale.wav" --rename '/$octave$name' --log


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
