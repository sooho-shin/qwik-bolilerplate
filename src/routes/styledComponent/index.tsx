import { component$ } from "@builder.io/qwik";
import { parent, child } from "./styles.css";

export default component$(() => {
  return (
    <>
      <div class={parent}>
        <div class={child}>show</div>
      </div>
      <div class={child}>ssoi</div>
    </>
  );
});
