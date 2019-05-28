const AsyncScriptLoader = (url, attr) => {

  let script = document.createElement('script')
  script.src = url

  if (attr)
    Object.keys(attr).forEach(prop => {
      return script.setAttribute(prop, attr[prop])
    })

  document.body.appendChild(script)
}

export default AsyncScriptLoader