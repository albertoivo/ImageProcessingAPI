function show(tool) {
  const nodeList = document.querySelector('.tools')
  const children = nodeList.children
  Array.from(children).forEach((div) => {
    div.style.display = 'none'
  })
  document.getElementById(tool).style.display = ''
}
