import { initStore } from "react-waterfall"

const store = {
  initialState: { authenticated: true, count: 0 },
  actions: {
    increment: ({ count }) => ({ count: count + 1 }),
  },
}

export const { Consumer, Provider, connect } = initStore(store)
