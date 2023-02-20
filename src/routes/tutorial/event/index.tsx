import { component$, useOnWindow, $ } from "@builder.io/qwik";

export default component$(() => {
  useOnWindow(
    "scrolling",
    $(() => console.log("?adsfsdf"))
  );

  return (
    <div>
      App Component. Click me.
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      asdfkjnasdfkjbdskbsdjkndsafjkb
    </div>
  );
});
