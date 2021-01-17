export function runAsyncMain(main: () => Promise<unknown>) {
  main().then(undefined, (err) => {
    console.error(err);
    process.exit(1);
  });
}
