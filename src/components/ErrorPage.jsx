import React from 'react'

const ErrorPage = () => {
  return (
     <>
        <div className='container-fluid'>
            <div className='d-block'>
                <h1 className='text-danger'>Page Not Found</h1>
                 <button className='btn btn-danger'>Back</button>
            </div>
        </div>
     </>
  )
}

export default ErrorPage