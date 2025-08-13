export const Profile = ( {name, picture} ) => {
    return (
        <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <img src={picture}></img>
            </div>
            {name}
        </div>
    )
}