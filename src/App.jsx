import { useState, useEffect } from 'react'

function App() {
  const [inputText, setIntputText] = useState('')
  const [inputbBgColor, setinputBgColor] = useState('ffffff')
  const [data, setData] = useState('')
  const [qrSrc, setQrSrc] = useState('')
  const [charWarning, setCharWarning] = useState(false)

  useEffect(() => {
    if (inputText !== '') setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?data=${decodeURIComponent(data)}&bgcolor=${inputbBgColor}`)
    else setQrSrc('')
  }, [inputText, data, inputbBgColor])

  return (
    <>
      <div className="h-screen w-screen bg-black sm:px-20 md:px-32 lg:px-60 xl:px-80 2xl:px-96 py-2 text-white">
        <div className="text-center text-2xl sm:text-4xl font-bold">QR Code Generator</div>

        <div className="mt-10 mx-2 flex flex-col">
          <label htmlFor="userInput">Enter URL or text:</label>
          <input
            type="text"
            id="userInput"
            className="px-2 my-1 h-7 text-gray-300 bg-gray-600 rounded"
            placeholder="Enter text here..."
            value={inputText}
            onChange={e => {
              if (e.target.value == '#' || e.target.value == '&' || (e.target.value).includes('#') || (e.target.value).includes('&')) setCharWarning(true)
              else {
                setIntputText(e.target.value)
                setData(encodeURIComponent(e.target.value))
                setCharWarning(false)
              }
            }}
          />
        </div>

        {charWarning && <div className='flex items-center justify-start mx-2 text-red-500 font-semibold'>'<span className='font-extrabold'>#</span>' and '<span className='font-extrabold'>&</span>' characters are not allowed.</div>}

        <div className='my-2 flex items-center justify-center'>
          <div className='mx-2'>Select background QR color:</div>
          <input
            type="color"
            className='border rounded-sm'
            value={`#${inputbBgColor}`}
            onChange={e => {
              let code = (e.target.value).split('#')[(e.target.value).split('#').length - 1].toString()
              setinputBgColor(code)
            }}
          />
        </div>

        <div className='my-2 mx-2 flex items-center justify-center'>
          <div className='bg-violet-600 hover:bg-violet-700 py-1 px-2 cursor-pointer rounded'
            onClick={() => {
              setinputBgColor('ffffff')
              setColor('ffffff')
            }}
          >Reset Color</div>
        </div>

        <div className="my-4 flex items-center justify-center">
          <img src={qrSrc} alt="" />
        </div>
      </div>
    </>
  )
}

export default App
