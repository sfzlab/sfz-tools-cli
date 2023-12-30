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
  analyzeOnsets,
  analyzePitch,
} from '@sfz-tools/core';
import { AnalyzeFile } from '@sfz-tools/core/dist/types/analyze';

const analyze = new Command('analyze')
  .arguments('<filepath>')
  .option('-da, --danceability', 'Danceability value from 0 to ~3')
  .option('-du, --duration', 'Duration in seconds (s)')
  .option('-en, --energy', 'Energy value')
  .option('-ke, --key', 'Key from A to G')
  .option('-l, --log', 'Enable logging')
  .option('-lo, --loudness', 'Loudness in decibels (dB)')
  .option('-no, --notes', 'Note list with each start (s), duration (s), loudness (dB), midi, name and octave values')
  .option('-on, --onsets', 'Note offset values')
  .option('-pi, --pitch', 'Pitch object containing frequency, midi, name, midi and octave values')
  .option('-sc, --scale', 'Scale of the key (major or minor)')
  .option('-sp, --speed', 'Speed estimation in beats per minute (bpm)')
  .description('Analyze audio files to detect audio features')
  .action(
    async (
      filepath: string,
      options: {
        danceability?: boolean;
        duration?: boolean;
        energy?: boolean;
        key?: boolean;
        log?: boolean;
        loudness?: boolean;
        notes?: boolean;
        onsets?: boolean;
        pitch?: boolean;
        scale?: boolean;
        speed?: boolean;
      }
    ) => {
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
      for (const fileitem of files) {
        log(fileitem);
        const fileExt: string = pathGetExt(fileitem);
        if (fileExt !== 'wav') {
          console.log(`Unsupported file extension ${fileExt}`);
          return;
        }
        const file: AnalyzeFile = analyzeLoad(fileitem);
        const features: any = {};
        if (options.danceability) features.danceability = analyzeDanceability(file.vector);
        if (options.duration) features.duration = analyzeDuration(file.vector);
        if (options.energy) features.energy = analyzeEnergy(file.vector);
        if (options.key) features.key = analyzeKey(file.vector);
        if (options.loudness) features.loudness = analyzeLoudness(file.vector);
        if (options.notes) features.notes = analyzeNotes(file);
        if (options.onsets) features.onsets = analyzeOnsets(file);
        if (options.pitch) features.pitch = analyzePitch(file.vector);
        if (options.scale) features.scale = analyzeScale(file.vector);
        if (options.speed) features.speed = analyzeSpeed(file.vector);
        console.log(features);
      }
    }
  );

export { analyze };
