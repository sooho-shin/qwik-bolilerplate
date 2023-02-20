/* eslint-disable no-console */
import { component$, useStore, Resource, useResource$ } from "@builder.io/qwik";

export default component$(() => {
  const post = useStore({
    number: 1,
  });

  const reposResource = useResource$<string[]>(({ track, cleanup }) => {
    // github 에 org 가 변경 될때 마다 데이터를 가져오게 하고싶음
    // track 으로 트리거 한다 (변경될떄마다 감지 하려고)
    track(() => post.number);

    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return getRepositories(post.number);
  });

  console.log("Render");
  return (
    <div>
      <span>
        Post number :
        <input
          value={post.number}
          onInput$={(ev) =>
            (post.number = Number((ev.target as HTMLInputElement).value))
          }
        />
      </span>
      <div>
        <Resource
          value={reposResource}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(repos) => {
            return (
              <ul>
                <li>{repos}</li>
                {/* {repos.map((repo) => (
                  <li>{repo}</li>
                ))} */}
              </ul>
            );
          }}
        />
      </div>
    </div>
  );
});

export async function getRepositories(postnumber: number): Promise<string[]> {
  // https://jsonplaceholder.typicode.com/todos/1
  console.log(
    "FETCH",
    `https://jsonplaceholder.typicode.com/posts/${postnumber}`
  );
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postnumber}`
  );
  console.log("FETCH resolved");
  const json = await resp.json();

  console.log("json===", json);
  return json.title;
  //   return Array.isArray(json)
  //     ? json.map((repo: { title: string }) => repo.title)
  //     : Promise.reject(json)
}
