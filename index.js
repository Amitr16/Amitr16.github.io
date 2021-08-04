
var Buffer = require('buffer/').Buffer ;
const ipfs = window.IpfsHttpClient.create({ host: "ipfs.infura.io", port: "5001", protocol: "https" });
// console.log(ipfs)
export async function uploadFile(file) {
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

export async function onImageChange(event) {
  const file = event.target.files[0]
  const files = await uploadFile(file)
  const file1 = event.target.files[1]
  const files1 = await uploadFile(file1)
  const file2 = event.target.files[2]
  const files2 = await uploadFile(file2)
  const multihash = files.path
  const multihash1 = files1.path
  const multihash2 = files2.path
  console.log(multihash)
  console.log(multihash1)
}

const file = document.querySelector('#file')

file.addEventListener('change', onImageChange)