import type { NoSerialize } from "@builder.io/qwik";
import { noSerialize } from "@builder.io/qwik";
import { component$, useStore } from "@builder.io/qwik";

interface AppStore {
  time: null | string;
  cleanup: NoSerialize<() => void>;
}
export default component$(() => {
  const store = useStore<AppStore>({
    time: null,
    cleanup: undefined,
  });
  return (
    <>
      <div>Current Time: {store.time}</div>

      <button
        onClick$={() => {
          // @ts-ignore
          const id = setInterval(
            () => (store.time = new Date().toString()),
            1000
          );

          store.cleanup = noSerialize(() => clearInterval(id));
          // assign a cleanup function to: store.cleanup
        }}
      >
        start
      </button>

      <button
        onClick$={() => {
          store.cleanup && store.cleanup();
          store.cleanup = undefined;
        }}
      >
        stop
      </button>
    </>
  );
});
