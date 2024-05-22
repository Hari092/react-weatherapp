
// eslint-disable-next-line react/prop-types
function Button({btnName}) {
  return (
    <div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-xl mt-2">{btnName}</button>
    </div>
  )
}

export default Button
