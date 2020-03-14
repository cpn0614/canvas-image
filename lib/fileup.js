class FileUp {
  config = {
    text: '请选择上传图片',
    accept: 'image/*',
    multiple: false,
    changeFunc: function(e){}
  }

  render() {
    let eles = document.getElementsByTagName('FileUpToCanvas')
    if (eles) {
      this.getConfig(eles[0])
      this.insertStyle().then(() => {
        let el = document.createElement('div')
        const elementData = this.getElement()
        el.innerHTML = elementData.html
        eles[0].parentNode.appendChild(el)
        this.addEventForInput(elementData.inputid)
        eles[0].parentNode.removeChild(eles[0])
      })
    }
  }

  getElement() {
    let labelid = "uplabel" + new Date().getTime()
    let inputid = "fileup-input" + new Date().getTime()
    const dom = document.getElementById(labelid)
    if (dom) {
      labelid = labelid + 1
      inputid = inputid + 1
    }
    return {
      labelid,
      inputid,
      html: `
        <div class="fileup">
          <label for="${inputid}" class="fileup-label" id="${labelid}">${this.config.text}</label>
          <input type="file" id="${inputid}" class="fileup-input" accept="${this.config.accept}" ${this.config.multiple? 'multiple' : ''}>
        </div>
      `
    }
  }

  addEventForInput(id) {
    let input = document.getElementById(id)
    // debugger
    if (input) {
      input.addEventListener('change', (e) => {
        this.getImages(e, id)
      })
    }
  }

  getImages(e, id) {
    let imgs = []
    let files = e.target.files
    for (let i = 0; i < files.length; i++) {
      let render = new FileReader()
      render.onload = (e) => {
        let image = new Image()
        image.src = e.target.result
        image.sizes = files[i].size * 0.0009766
        image.title = files[i].name
        this.insertImgElement(image, id)
      }
      render.readAsDataURL(files[i])
    }
    return imgs
  }
  
  insertImgElement(img, id) {
    let insertTree = document.getElementById(id)
    let { width, height, src, title, size } = img
    let pic = document.createElement('img')
    this._extend(pic, {
      title,
      width,
      height,
      src,
      size
    })
    insertTree.parentNode.appendChild(pic)
  }

  getConfig(dom) {
    let dataConfig = dom.getAttribute('data-config')
    if (dataConfig) {
      this._extend(this.config, JSON.parse(dataConfig))
    }
  }

  insertStyle() {
    const head = document.getElementsByTagName('head')[0]
    const cssName = 'fileup-style'
    let style = document.getElementById(cssName)
    return new Promise((resolve, reject) => {
      if (style !== null && style !== undefined) {
        resolve()
      } else {
        style = document.createElement('link')
        this._extend(style, {
          id: cssName,
          rel: 'stylesheet',
          type: 'text/css',
          href: './lib/css/fileup.css',
          onload: resolve
        })
        head.appendChild(style)
      }
    })
  }

  _extend(target, source) {
    for(const key in source) {
      target[key] = source[key]
    }
    return target
  }
}

let fu = new FileUp()
document.addEventListener('DOMContentLoaded', function(){
  fu.render()
}, false);
