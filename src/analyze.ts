import { Command } from 'commander';
import {
  apiBuffer,
  dirRead,
  analyzeDanceability,
  analyzeDuration,
  analyzeEnergy,
  analyzeKey,
  analyzeLoad,
  analyzeLoudness,
  analyzeNotes,
  analyzeScale,
  analyzeSpeed,
  fileCreate,
  logEnable,
  pathGetExt,
  pathGetFilename,
  log,
} from '@sfz-tools/core';
import { AnalyzeVector } from '@sfz-tools/core/dist/types/analyze';

const analyze = new Command('analyze')
  .arguments('<filepath>')
  .option('-l, --log', 'Enable logging')
  .description('Analyze audio files to find features')
  .action(async (filepath: string, options: { log?: boolean }) => {
    if (options.log) logEnable();
    let files: string[] = [];
    // Load remote url or local file
    if (filepath.startsWith('http')) {
      const fileData: Buffer = await apiBuffer(filepath);
      const filename: string = pathGetFilename(filepath);
      const ext: string = pathGetExt(filepath);
      fileCreate(`${filename}.${ext}`, fileData);
      files = [`${filename}.${ext}`];
    } else {
      files = dirRead(filepath);
    }
    log('files', files);
    // loop through remote/local files
    for (const file of files) {
      const fileExt: string = pathGetExt(file);
      if (fileExt !== 'wav') console.log(`Unsupported file extension ${fileExt}`);
      const vector: AnalyzeVector = analyzeLoad(file);
      const features: any = {
        danceability: analyzeDanceability(vector),
        duration: analyzeDuration(vector),
        energy: analyzeEnergy(vector),
        key: analyzeKey(vector),
        loudness: analyzeLoudness(vector),
        notes: analyzeNotes(vector),
        scale: analyzeScale(vector),
        speed: analyzeSpeed(vector),
      };
      console.log(features);
    }
  });

export { analyze };
