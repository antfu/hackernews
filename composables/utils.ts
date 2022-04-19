export const lazy = (commit, task, optimistic, enabled = false) => {
  // By default, do lazy operations only in client
  if (enabled === undefined)
    enabled = process.client

  // Non lazy mode
  if (!enabled)
    return task().then(commit).catch(console.error) // eslint-disable-line no-console

  // Do real task in background
  Promise.resolve(task(optimistic))
    .then(commit)
    .catch(console.error) // eslint-disable-line no-console

  // Commit optimistic value and resolve
  return Promise.resolve(commit(optimistic))
}