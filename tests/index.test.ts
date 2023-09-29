import { cli, CliOutput } from './shared';

test('Convert sfz to json', async () => {
  const output: CliOutput = await cli(`convert ./test/syntax/basic.sfz --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});
