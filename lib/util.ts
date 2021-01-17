export function runAsyncMain(main: () => Promise<unknown>): void {
  main().then(undefined, (err) => {
    console.error(err);
    process.exit(1);
  });
}
