declare module 'compressjs' {
  import { Readable, Writable } from 'stream';

  export type Data = Readable | Uint8Array | Buffer | number[];
  export type CompressionLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  export function compressFile(input: Data): number[];
  export function compressFile(input: Data, output: Writable): void;
  export function compressFile(input: Data, output: Writable, compressionLevel: CompressionLevel): void;
  export function decompressFile(input: Data): Data;
  export function decompressFile(input: Data, output: Writable): Data;

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
}
