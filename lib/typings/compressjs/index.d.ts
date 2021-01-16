declare module 'compressjs' {
  export type Data = ReadableStream | Uint8Array | Buffer | number[];
  export type CompressionLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  export function compressFile(input: Data): number[];
  export function compressFile(input: Data, output: WritableStream): void;
  export function compressFile(input: Data, output: WritableStream, compressionLevel: CompressionLevel): void;
  export function decompressFile(input: Data): Data;
  export function decompressFile(input: Data, output: WritableStream): Data;

  export interface CompressionMethod {
    MAGIC?: string;
    compressFile: typeof compressFile;
    decompressFile: typeof decompressFile;
  }

  export const Simple: CompressionMethod;
  export const PPM: CompressionMethod;
  export const Lzp3: CompressionMethod;
  export const LzjbR: CompressionMethod;
  export const Lzjb: CompressionMethod;
  export const Dmc: CompressionMethod;
  export const Bzip2: CompressionMethod;
  export const BWTC: CompressionMethod;
  export const Huffman: CompressionMethod;
  export const NoModel: CompressionMethod;
  export const MTFModel: CompressionMethod;
  export const FenwickModel: CompressionMethod;
  export const DefSumModel: CompressionMethod;
  export const Context1Model: CompressionMethod;

  // BitStream: [Function: BitStream] { EOF: -1 },
  // Stream: [Function: Stream] { EOF: -1 },
  // BWT: [Object: null prototype] {
  //   suffixsort: [Function (anonymous)],
  //   bwtransform: [Function (anonymous)],
  //   unbwtransform: [Function (anonymous)],
  //   bwtransform2: [Function (anonymous)]
  // },
  // Context1Model: [Function: Context1Model] {
  //   MAGIC: 'ctx1',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // DefSumModel: [Function: DefSumModel] {
  //   factory: [Function (anonymous)],
  //   MAGIC: 'dfsm',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // FenwickModel: [Function: FenwickModel] {
  //   factory: [Function (anonymous)],
  //   MAGIC: 'fenw',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // MTFModel: [Function: MTFModel] {
  //   factory: [Function (anonymous)],
  //   MAGIC: 'mtfm',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // NoModel: [Function: NoModel] {
  //   factory: [Function (anonymous)],
  //   MAGIC: 'nomo',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // Huffman: [Function: Huffman] {
  //   factory: [Function (anonymous)],
  //   MAGIC: 'huff',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // RangeCoder: [Function: RangeCoder],
  // BWTC: [Object: null prototype] {
  //   MAGIC: 'bwtc',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // Bzip2: [Object: null prototype] {
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)],
  //   decompressBlock: [Function (anonymous)],
  //   table: [Function (anonymous)]
  // },
  // Dmc: [Object: null prototype] {
  //   MAGIC: 'dmc!',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // Lzjb: [Object: null prototype] {
  //   MAGIC: 'lzjb',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // LzjbR: [Object: null prototype] {
  //   MAGIC: 'lzjR',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // Lzp3: [Object: null prototype] {
  //   MAGIC: 'lzp3',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // PPM: [Function: PPM] {
  //   MAGIC: 'ppm2',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // },
  // Simple: [Object: null prototype] {
  //   MAGIC: 'smpl',
  //   compressFile: [Function (anonymous)],
  //   decompressFile: [Function (anonymous)]
  // }
}
