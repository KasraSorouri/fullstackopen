const ShowError = ({ errorMassege }) => {
  if(errorMassege === null) {
    return null
  }
  console.log('error ->', errorMassege)
  return (
    <div className="error">
      <h2>{errorMassege}</h2>
    </div>
  )
}

export default ShowError