import { cli, CliOutput } from './shared';

test('Example', async () => {
  const output: CliOutput = await cli(`format convert ./test/example.sfz --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});
