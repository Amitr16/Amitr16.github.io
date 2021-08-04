

const ipfs = window.IpfsHttpClient.create({ host: "ipfs.infura.io", port: "5001", protocol: "https" });

async function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      console.log(reader.result)
      const buffer = Buffer.from(reader.result)
      ipfs.add(buffer)
      .then(files => {
        resolve(files)
      })
      .catch(error => alert(error))
    }
    reader.readAsArrayBuffer(file)
  })
}

async function onImageChange(event) {
  const file = event.target.files[0]
  const files = await uploadFile(file)
  const multihash = files[0].hash
  console.log(multihash)
}

const file = document.querySelector('#file')

file.addEventListener('change', onImageChange)