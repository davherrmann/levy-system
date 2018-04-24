import { initStore } from "react-waterfall"

const store = {
  initialState: {
    authenticated: true,
    count: 0,
    users: [{ asdf: "asdfefef" }, { age: 9 }],
  },
  actions: {
    increment: ({ count }) => ({ count: count + 1 }),
    login: () => ({ authenticated: true }),
    logout: () => ({ authenticated: false }),
    update: (_, e) => e,
  },
}

export const { Consumer, Provider, connect } = initStore(store)
