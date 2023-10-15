import { cli, CliOutput } from './shared';

test('Convert basic.sfz to json', async () => {
  const output: CliOutput = await cli(`convert ./test/syntax/basic.sfz --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});

test('Convert basic.sfz to xml', async () => {
  const output: CliOutput = await cli(`convert ./test/syntax/basic.sfz --xml`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});

test('Convert test directory to json', async () => {
  const output: CliOutput = await cli(`convert "./test/**/*.sfz" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});

test('Convert test directory to xml', async () => {
  const output: CliOutput = await cli(`convert "./test/**/*.sfz" --xml`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});

test('Convert remote jRhodes to json', async () => {
  const output: CliOutput = await cli(`convert https://raw.githubusercontent.com/sfzinstruments/jlearman.jRhodes3c/master/jRhodes3c-looped-flac-sfz/_jRhodes-stereo-looped.sfz --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});

test('Convert remote jRhodes to xml', async () => {
  const output: CliOutput = await cli(`convert https://raw.githubusercontent.com/sfzinstruments/jlearman.jRhodes3c/master/jRhodes3c-looped-flac-sfz/_jRhodes-stereo-looped.sfz --xml`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});
