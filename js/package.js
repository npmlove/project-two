(function () {
  const Utils = {
    loadScript({ name, val, src }) {
      // 如果已存在，不再重新加载
      const existedScript = document.querySelector(`#${name}`)
      if (existedScript) {
        return
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.setAttribute('defer', true)
      script.id = name
      script.onload = () => {
        console.log(`${name} is loaded, use ${val}`)
      }
      script.src = src
      document.head.appendChild(script)
    },
    loadScripts() {
      const scripts = [
        {
          name: 'qs',
          val: 'Qs',
          src: './js/qs.min.js',
        },
        {
          name: 'dayjs',
          val: 'dayjs',
          src: './js/dayjs.min.js',
        },
      ]
      scripts.forEach(item => Utils.loadScript(item))
    },
  }
  Utils.loadScripts()
})()