export default function Loader({ percentage }) {
    console.debug(`///// LOADER -> render`)

    return (
        <div className=" bg-gray-400/80 backdrop-blur-xl top-0 h-full w-full fixed z-50">
            <div
                style={{ width: `${percentage}%` }}
                className="absolute h-2 transition-all duration-500  bg-white rounded-e animate-pulse"
            ></div>
            <div className="flex items-center justify-center top-0 h-full w-full fixed">

                <h1 className="text-white flex items-center mx-4 font-extrabold bg-[url('../../../assets/LiveDive-Logo-w.svg')] bg-no-repeat bg-left bg-contain  w-14 h-14  text-center text-[0] animate-pulse" >LiveDive</h1>
            </div>
        </div>
    )

}