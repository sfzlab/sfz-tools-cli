import { cli, CliOutput } from './shared';

test('Get help', async () => {
  const output: CliOutput = await cli(`--help`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});

// test('Get version', async () => {
//   const output: CliOutput = await cli(`--version`);
//   expect(output.exitCode).toBe(0);
//   expect(output.stdout).toMatchSnapshot();
// });
