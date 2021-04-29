import { createApp } from './main'
import { renderToString } from '@vue/server-renderer'

export async function render(url, manifest) {
  const { app, router } = createApp()

  router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  // console.log(router.currentRoute.value.meta)
  // const to = router.currentRoute;
  // const matchedRoute = to.value.matched;
  // console.log(matchedRoute, 'matchedRoute')
  const currentRouteMeta = router.currentRoute.value.meta || {}
  return [html, preloadLinks, currentRouteMeta]
}

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    // TODO
    return ''
  }
}
