// import { component$ } from '@builder.io/qwik'

// export default component$(() => {
//   return (
//     <a href="/" onClick$={() => window.open('http://qwik.builder.io')}>
//       click me!
//     </a>
//   )
// })

import { component$, useClientEffect$, useSignal } from '@builder.io/qwik'

export default component$(() => {
  const aHref = useSignal<Element>()
  useClientEffect$(() => {
    const handler = (event: Event) => {
      event.preventDefault()
      window.open('http://qwik.builder.io')
    }
    aHref.value!.addEventListener('click', handler)
    return () => aHref.value!.removeEventListener('click', handler)
  })

  return (
    <a href="/" ref={aHref}>
      click me!
    </a>
  )
})
