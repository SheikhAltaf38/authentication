import React from 'react'

function Loading({msg}) {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <h1 className='text-2xl font-bold'>{msg} ....</h1>
    </div>
  )
}

export default Loading